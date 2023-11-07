function verifyToken(req, res, next) {
    let token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        token = token.split(" ")[1];
        if (!token || process.env.AUTH_TOKEN !== token.trim()) {
            throw new Error('Auth failed')
        }
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid token' });
    }
}

module.exports = verifyToken;