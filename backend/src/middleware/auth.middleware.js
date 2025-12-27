const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Auth middleware that validates backend JWT and attaches the user to req.user
async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || '';

  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(payload.sub);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    return next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('JWT authentication error:', error);
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

module.exports = authMiddleware;
