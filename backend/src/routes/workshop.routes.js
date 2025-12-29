const express = require('express');
const workshopController = require('../controllers/workshop.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');
const multer = require('multer');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', workshopController.getWorkshops);
router.get('/:id', workshopController.getWorkshopById);
router.post('/', authMiddleware, adminMiddleware, upload.single('image'), workshopController.createWorkshopWithImage);
router.put('/:id', authMiddleware, adminMiddleware, upload.single('image'), workshopController.updateWorkshopWithImage);
router.delete('/:id', authMiddleware, adminMiddleware, workshopController.deleteWorkshop);

module.exports = router;
