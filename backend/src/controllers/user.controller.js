const User = require('../models/user.model');

async function getMe(req, res) {
    // req.user is populated by the authMiddleware
    res.status(200).json(req.user);
}

async function getAllUsers(req, res) {
    try {
        const users = await User.find().select('-__v');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users', error: error.message });
    }
}

async function updateUserRole(req, res) {
    try {
        const { role } = req.body;
        
        if (!['user', 'admin'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role. Must be "user" or "admin".' });
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update user role', error: error.message });
    }
}

module.exports = {
    getMe,
    getAllUsers,
    updateUserRole,
};
