const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Initialize Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
  let serviceAccountConfig = {};

  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    // Prefer env var if provided (e.g. in production)
    serviceAccountConfig = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
  }
   else {
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
    console.log('❌ No idToken provided');
    return res.status(400).json({ 
      success: false,
      message: 'idToken is required' 
    });
  }

  try {
    console.log('🔐 Verifying Firebase ID token...');
    // 1. Verify Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { email, name, uid } = decodedToken;

    console.log('✅ Firebase token verified for:', email);

    if (!email) {
      return res
        .status(400)
        .json({ 
          success: false,
          message: 'Email not available from Firebase token' 
        });
    }

    // 2. Find or create user in MongoDB
    let user = await User.findOne({ email });

    if (!user) {
      console.log('👤 Creating new user:', email);
      user = await User.create({
        email,
        name: name || email.split('@')[0],
        firebaseUid: uid,
      });
    } else {
      console.log('👤 User already exists:', email);
      // Update firebaseUid if not set
      if (!user.firebaseUid) {
        user.firebaseUid = uid;
        await user.save();
      }
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

    console.log('🎫 JWT token issued for user:', user._id);

    // 4. Return user + JWT
    return res.status(200).json({
      success: true,
      token,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('❌ Firebase login failed:', error.message);
    console.error('Error code:', error.code);
    
    let statusCode = 401;
    let message = 'Invalid Firebase token';
    
    // Provide more specific error messages
    if (error.code === 'auth/id-token-expired') {
      message = 'Firebase token has expired. Please sign in again.';
    } else if (error.code === 'auth/invalid-id-token') {
      message = 'Invalid Firebase token format.';
    } else if (error.message.includes('ECONNREFUSED')) {
      statusCode = 503;
      message = 'Backend service is unavailable. Please try again later.';
    }
    
    return res.status(statusCode).json({ 
      success: false,
      message,
      error: error.message 
    });
  }
}

module.exports = {
  loginWithFirebase,
};
