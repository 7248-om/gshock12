const express = require('express');
const synesthesiaController = require('../controllers/synesthesia.controller');

const router = express.Router();

// GET /api/synesthesia/pair?vibe=bold
router.get('/pair', synesthesiaController.getPairing);

module.exports = router;