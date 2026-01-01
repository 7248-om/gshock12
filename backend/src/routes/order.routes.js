const express = require('express');
const orderController = require('../controllers/order.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');

const router = express.Router();

// Special routes first (before :id)
// User route - get own orders
router.get('/user/my-orders', authMiddleware, orderController.getMyOrders);

// Admin routes - get all orders
router.get('/', authMiddleware, adminMiddleware, orderController.getOrders);

// Get specific order
router.get('/:id', authMiddleware, orderController.getOrderById);

// Create order
router.post('/', authMiddleware, orderController.createOrder);

// Update order (admin only)
router.put('/:id', authMiddleware, adminMiddleware, orderController.updateOrder);

// Update order status (admin only)
router.patch('/:id/status', authMiddleware, adminMiddleware, orderController.updateOrderStatus);

// Delete order (admin only)
router.delete('/:id', authMiddleware, adminMiddleware, orderController.deleteOrder);

module.exports = router;
