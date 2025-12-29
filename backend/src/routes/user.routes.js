const express = require('express');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');

const router = express.Router();

router.get('/me', authMiddleware, userController.getMe);
router.get('/', authMiddleware, adminMiddleware, userController.getAllUsers);
router.put('/:id/role', authMiddleware, adminMiddleware, userController.updateUserRole);

module.exports = router;
