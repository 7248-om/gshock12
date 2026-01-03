const express = require('express');
const artistController = require('../controllers/artist.controller');
const authMiddleware = require('../middleware/auth.middleware');
// const adminMiddleware = require('../middleware/admin.middleware'); // Optional if needed

const router = express.Router();

// Public Routes
router.get('/', artistController.getArtists);       // GET /api/artists
router.get('/:id', artistController.getArtistById); // GET /api/artists/:id

// Protected Routes (Require Login)
router.post('/', authMiddleware, artistController.createArtist);  // POST /api/artists
router.put('/:id', authMiddleware, artistController.updateArtist); // PUT /api/artists/:id

module.exports = router;