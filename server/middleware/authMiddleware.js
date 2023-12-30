// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authenticateUser = async (req, res, next) => {
    try {
        // Extract token from headers
        const token = req.header('Authorization').replace('Bearer ', '');

        // Verify token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // Inside authenticateUser middleware
        // console.log('Decoded Token:', decoded);


        // Find user by ID and populate req.user
        req.user = await User.findById(decoded.id);

        if (!req.user) {
            throw new Error();
        }

        next();
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized' });
    }
};
