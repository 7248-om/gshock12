const express = require('express');
const cartController = require('../controllers/cart.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', authMiddleware, cartController.getCart);
router.post('/', authMiddleware, cartController.addToCart);
router.delete('/:productId', authMiddleware, cartController.removeFromCart);

module.exports = router;
