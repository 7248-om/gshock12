import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:5001/api';

interface CreateOrderPayload {
  amount: number;
  items: any[];
  userId: string;
}

interface PaymentOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: any) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
}

/**
 * Create a payment order on the backend
 */
export const createPaymentOrder = async (payload: CreateOrderPayload) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      const error = 'No authentication token found. Please login again.';
      console.error('❌ AUTH ERROR:', error);
      throw new Error(error);
    }

    console.log('🔑 Auth token found, length:', token.length);
    console.log('📤 Sending payload to backend:', {
      totalAmount: payload.totalAmount,
      itemsCount: payload.items.length,
      userId: payload.userId,
      items: payload.items,
    });
    
    const response = await axios.post(
      `${API_BASE_URL}/payments/create-order`,
      payload,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    console.log('✅ Payment order created successfully:', response.data);
    
    // Validate response
    if (!response.data.razorpayOrderId || !response.data.orderId) {
      throw new Error('Invalid response from backend: missing order IDs');
    }
    
    return response.data;
  } catch (error: any) {
    console.error('❌ PAYMENT ORDER ERROR:');
    console.error('Error type:', error.name);
    console.error('Error message:', error.message);
    
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      console.error('No response received. Request was made but no response:');
      console.error('Request:', error.request);
    } else {
      console.error('Request setup error:', error.message);
    }
    
    if (error.response?.status === 401) {
      console.error('❌ Authentication failed. Token may be expired or invalid.');
      localStorage.removeItem('authToken');
    }
    
    throw error;
  }
};

/**
 * Verify payment signature after successful payment
 */
export const verifyPayment = async (paymentData: any) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No authentication token found. Please login again.');
    }

    const response = await axios.post(
      `${API_BASE_URL}/payments/verify`,
      paymentData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('✅ Payment verified successfully');
    return response.data;
  } catch (error: any) {
    console.error('❌ Error verifying payment:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Handle payment failure
 */
export const handlePaymentFailure = async (orderId: string, error: any) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.warn('No auth token for failure handler');
      return;
    }

    const response = await axios.post(
      `${API_BASE_URL}/payments/failure`,
      {
        orderId,
        error: JSON.stringify(error),
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('✅ Payment failure logged');
    return response.data;
  } catch (err) {
    console.error('❌ Error handling payment failure:', err);
  }
};

/**
 * Initiate Razorpay payment
 */
export const initiateRazorpayPayment = async (
  totalAmount: number,
  cartItems: any[],
  userId: string,
  userEmail: string,
  userName: string,
  onPaymentSuccess: (response: any) => void,
  onPaymentError?: (error: any) => void
) => {
  try {
    // Validate amount
    const validAmount = parseFloat((totalAmount || 0).toString());
    if (isNaN(validAmount) || validAmount <= 0) {
      throw new Error('Invalid payment amount: ' + totalAmount);
    }

    // Step 1: Create order on backend
    console.log('📦 Creating payment order for amount:', validAmount);
    
    // Transform cart items to match backend order schema
    const formattedItems = cartItems.map((item: any) => {
      // Extract numeric price from string like "$100.00" or "₹100.00"
      const priceStr = (item.price || '0').replace(/[$₹\s]/g, '').trim();
      const price = parseFloat(priceStr);
      
      return {
        itemType: 'menu',
        itemId: item.id,
        quantity: item.quantity,
        price: isNaN(price) ? 0 : price,
      };
    });
    
    const orderResponse = await createPaymentOrder({
      totalAmount: validAmount,
      items: formattedItems,
      userId,
    });

    const { razorpayOrderId, orderId } = orderResponse;

    // Step 2: Setup Razorpay payment options
    const options: PaymentOptions = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_jtlBNyV6SL0IYF',
      amount: validAmount * 100, // Amount in paise
      currency: 'INR',
      name: 'Rabuste Coffee',
      description: 'Order Payment',
      order_id: razorpayOrderId,
      handler: async (response) => {
        console.log('✅ Payment successful:', response);
        try {
          // Verify payment
          await verifyPayment({
            orderId,
            paymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          });
          onPaymentSuccess(response);
        } catch (error) {
          console.error('❌ Payment verification failed:', error);
          onPaymentError?.(error);
        }
      },
      prefill: {
        name: userName,
        email: userEmail,
      },
      theme: {
        color: '#3E2723',
      },
    };

    // Step 3: Open Razorpay checkout
    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();

    // Handle payment close
    razorpay.on('payment.failed', async (error: any) => {
      console.error('❌ Payment failed:', error);
      console.error('Error description:', error.description);
      console.error('Error source:', error.source);
      console.error('Error reason:', error.reason);
      await handlePaymentFailure(orderId, error);
      onPaymentError?.(error);
    });
  } catch (error: any) {
    console.error('❌ Error initiating Razorpay payment:', error);
    console.error('Error message:', error.message);
    console.error('Full error:', JSON.stringify(error, null, 2));
    onPaymentError?.(error);
  }
};
