const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Initialize Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
  let serviceAccountConfig = {};

  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    // Prefer env var if provided (e.g. in production)
    serviceAccountConfig = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
  } else {
    // Fallback to local config file for development
    // NOTE: make sure this file is NOT committed with real credentials in a public repo
    // and is added to .gitignore if it contains secrets.
    // eslint-disable-next-line global-require, import/no-dynamic-require
    serviceAccountConfig = require('../config/firebaseAdminKey.json');
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountConfig),
  });
}

async function loginWithFirebase(req, res) {
  const { idToken } = req.body || {};

  if (!idToken) {
    return res.status(400).json({ message: 'idToken is required' });
  }

  try {
    // 1. Verify Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { email, name } = decodedToken;

    if (!email) {
      return res
        .status(400)
        .json({ message: 'Email not available from Firebase token' });
    }

    // 2. Find or create user in MongoDB
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        name: name || email.split('@')[0],
      });
    }

    // 3. Issue backend JWT
    const payload = {
      sub: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    // 4. Return user + JWT
    return res.status(200).json({
      token,
      user,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Firebase login failed:', error);
    return res.status(401).json({ message: 'Invalid Firebase token' });
  }
}

module.exports = {
  loginWithFirebase,
};
