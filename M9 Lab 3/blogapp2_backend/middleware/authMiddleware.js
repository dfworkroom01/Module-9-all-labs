const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Define the secret key directly 
const JWT_SECRET = '';  

// Middleware to verify JWT token and extract user info
const authMiddleware = async (req, res, next) => {
  // Extract token from the Authorization header (expected format: Bearer <token>)
  const token = req.header('Authorization')?.split(' ')[1]; // 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Decode and verify the token using the hardcoded secret key
    const decoded = jwt.verify(token, JWT_SECRET);  // Use the hardcoded secret key 

    // Log the decoded token for debugging purposes
    console.log('Decoded token:', decoded);

    // Retrieve user from the database using Sequelize 
    const user = await User.findByPk(decoded.userId);  // The 'user id' is in the token payload

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Attach user information to the request object for use in other routes
    req.user = user;
    next();
  } catch (error) {
    console.error('Token verification error:', error);  // Log any error that occurs during token verification
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
