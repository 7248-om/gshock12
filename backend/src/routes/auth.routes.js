const express = require('express');
const { loginWithFirebase } = require('../controllers/auth.controller');

const router = express.Router();

// POST /api/auth/login
// Body: { idToken: string }
// Verifies Firebase ID token, creates/fetches user, returns backend JWT + user
router.post('/login', loginWithFirebase);

module.exports = router;
