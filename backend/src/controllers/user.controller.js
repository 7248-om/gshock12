const User = require('../models/user.model');

async function getMe(req, res) {
    // req.user is populated by the authMiddleware
    res.status(200).json(req.user);
}

module.exports = {
    getMe,
};
