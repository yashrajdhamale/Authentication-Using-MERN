const jwt = require('jsonwebtoken');
const User = require('./User-Model');
const SECRET_KEY = process.env.SECRET_KEY;

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    const token = authHeader && authHeader.split(' ')[1];
    

    if (!token) return res.status(401).json({ error: "Access denied, token missing!" });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid token" });        
        req.user = user;
        next();
    });
}

// Fetch profile controller
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        res.status(200).json({ profile: user });
    } catch (error) {
        res.status(500).json({ error: "Error fetching profile" });
    }
}

module.exports = { authenticateToken, getProfile };
