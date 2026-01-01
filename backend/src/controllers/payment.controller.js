const crypto = require('crypto');
const Razorpay = require('razorpay');
const Order = require('../models/order.model');

// Validate Razorpay configuration
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.error('❌ ERROR: Razorpay credentials are not configured!');
  console.error('Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in your .env file');
}

if (process.env.RAZORPAY_KEY_SECRET === 'your_razorpay_secret_key_here') {
  console.error('❌ WARNING: RAZORPAY_KEY_SECRET is still a placeholder!');
  console.error('Update it with your actual Razorpay Secret Key from https://dashboard.razorpay.com');
}

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/**
 * Create a payment order with Razorpay
 * POST /api/payments/create-order
 */
async function createPaymentOrder(req, res) {
  try {
    const { items, totalAmount } = req.body;
    const userId = req.user._id; // Use _id from MongoDB user object

    console.log('📥 Payment order request received');
    console.log('User ID:', userId);
    console.log('Items:', items);
    console.log('Total Amount:', totalAmount);

    // Validate input
    if (!items || !Array.isArray(items)) {
      return res.status(400).json({
        success: false,
        message: 'Items must be an array',
      });
    }

    if (!totalAmount) {
      return res.status(400).json({
        success: false,
        message: 'Missing required field: totalAmount',
      });
    }

    const validAmount = parseFloat(totalAmount);
    if (isNaN(validAmount) || validAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Total amount must be a valid number greater than 0',
      });
    }

    console.log('📦 Creating Razorpay order for amount:', validAmount);

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(validAmount * 100), // Amount in smallest unit (paise for INR)
      currency: 'INR',
      receipt: `order_${Date.now()}`,
      notes: {
        userId: userId.toString(),
        itemCount: items.length,
      },
    });

    console.log('✅ Razorpay order created:', razorpayOrder.id);

    // Create order in database with pending payment status
    const order = await Order.create({
      user: userId,
      items,
      totalAmount: validAmount,
      paymentStatus: 'pending',
      razorpayOrderId: razorpayOrder.id,
    });

    console.log('✅ Order saved to DB:', order._id);

    res.status(201).json({
      success: true,
      razorpayOrderId: razorpayOrder.id,
      orderId: order._id,
      amount: validAmount,
      currency: 'INR',
      message: 'Payment order created successfully',
    });
  } catch (error) {
    console.error('❌ Payment order creation error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Failed to create payment order',
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
}

/**
 * Verify payment and update order status
 * POST /api/payments/verify
 */
async function verifyPayment(req, res) {
  try {
    const { orderId, paymentId, razorpaySignature } = req.body;

    console.log('🧾 Verify Payment Request:');
    console.log('orderId:', orderId);
    console.log('paymentId:', paymentId);
    console.log('razorpaySignature:', razorpaySignature);

    // Validate input
    if (!orderId || !paymentId || !razorpaySignature) {
      console.error('❌ Missing fields:', { orderId, paymentId, razorpaySignature });
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: orderId, paymentId, razorpaySignature',
      });
    }

    // Find order
    const order = await Order.findById(orderId);
    if (!order) {
      console.error('❌ Order not found with ID:', orderId);
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    console.log('✅ Order found:', order._id);
    console.log('Razorpay Order ID from DB:', order.razorpayOrderId);

    // Verify signature
    const body = order.razorpayOrderId + '|' + paymentId;
    console.log('🔐 Body for signature verification:', body);
    console.log('🔑 Using secret key for HMAC');

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    console.log('Expected signature:', expectedSignature);
    console.log('Received signature:', razorpaySignature);
    console.log('Signatures match:', expectedSignature === razorpaySignature);

    if (expectedSignature !== razorpaySignature) {
      console.error('❌ Signature verification failed!');
      console.error('This usually means either:');
      console.error('1. The RAZORPAY_KEY_SECRET is incorrect');
      console.error('2. The payment data was tampered with');
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed - invalid signature',
      });
    }

    console.log('✅ Signature verified successfully');

    // Update order status to paid
    order.paymentStatus = 'paid';
    order.razorpayPaymentId = paymentId;
    order.razorpaySignature = razorpaySignature;
    await order.save();

    // Fetch updated order with populated references
    // We need to populate items based on their itemType
    let updatedOrder = await Order.findById(orderId).populate('user');
    
    // Manually populate items based on itemType
    for (let i = 0; i < updatedOrder.items.length; i++) {
      const item = updatedOrder.items[i];
      let populatedItem;
      
      if (item.itemType === 'menu') {
        const Product = require('../models/product.model');
        populatedItem = await Product.findById(item.itemId);
      } else if (item.itemType === 'artwork') {
        const Artwork = require('../models/artwork.model');
        populatedItem = await Artwork.findById(item.itemId);
      } else if (item.itemType === 'workshop') {
        const Workshop = require('../models/workshop.model');
        populatedItem = await Workshop.findById(item.itemId);
      }
      
      if (populatedItem) {
        updatedOrder.items[i].itemId = populatedItem;
      }
    }

    console.log('✅ Order marked as paid:', orderId);

    res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      order: updatedOrder,
    });
  } catch (error) {
    console.error('❌ Payment verification error:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Payment verification failed',
      error: error.message,
    });
  }
}

/**
 * Handle payment failure
 * POST /api/payments/failure
 */
async function handlePaymentFailure(req, res) {
  try {
    const { orderId, error } = req.body;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: 'Missing orderId',
      });
    }

    console.log('❌ Recording payment failure for order:', orderId);

    // Update order status to failed
    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        paymentStatus: 'failed',
        failureReason: error,
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Payment failure recorded',
      order,
    });
  } catch (error) {
    console.error('❌ Payment failure handling error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to record payment failure',
      error: error.message,
    });
  }
}

/**
 * Get payment status for an order
 * GET /api/payments/:orderId
 */
async function getPaymentStatus(req, res) {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId).populate('user').populate('items.itemId');
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('❌ Error getting payment status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get payment status',
      error: error.message,
    });
  }
}

module.exports = {
  createPaymentOrder,
  verifyPayment,
  handlePaymentFailure,
  getPaymentStatus,
};
