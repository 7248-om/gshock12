const express = require('express');
const menuController = require('../controllers/menu.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');

const router = express.Router();

// Public
router.get('/', menuController.getMenu);
router.get('/:id', menuController.getMenuItem);

// Admin Only
router.post('/', authMiddleware, adminMiddleware, menuController.createMenuItem);
router.put('/:id', authMiddleware, adminMiddleware, menuController.updateMenuItem);
router.delete('/:id', authMiddleware, adminMiddleware, menuController.deleteMenuItem);

module.exports = router;