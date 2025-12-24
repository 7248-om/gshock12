const express = require('express');
const orderController = require('../controllers/order.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');

const router = express.Router();

router.get('/', authMiddleware, adminMiddleware, orderController.getOrders);
router.get('/:id', authMiddleware, orderController.getOrderById);
router.post('/', authMiddleware, orderController.createOrder);
router.put('/:id', authMiddleware, adminMiddleware, orderController.updateOrder);
router.patch('/:id/status', authMiddleware, adminMiddleware, orderController.updateOrderStatus);
router.delete('/:id', authMiddleware, adminMiddleware, orderController.deleteOrder);

module.exports = router;
