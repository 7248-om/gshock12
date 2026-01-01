const express = require('express');
const paymentController = require('../controllers/payment.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// All payment routes require authentication
router.use(authMiddleware);

/**
 * POST /api/payments/create-order
 * Create a new payment order with Razorpay
 */
router.post('/create-order', paymentController.createPaymentOrder);

/**
 * POST /api/payments/verify
 * Verify payment after successful transaction
 */
router.post('/verify', paymentController.verifyPayment);

/**
 * POST /api/payments/failure
 * Record payment failure
 */
router.post('/failure', paymentController.handlePaymentFailure);

/**
 * GET /api/payments/:orderId
 * Get payment status for an order
 */
router.get('/:orderId', paymentController.getPaymentStatus);

module.exports = router;
