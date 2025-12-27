function adminMiddleware(req, res, next) {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isAdmin = req.user.role === 'admin' || req.user.email === process.env.ADMIN_EMAIL;

    if (isAdmin) {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden' });
    }
}

module.exports = adminMiddleware;
