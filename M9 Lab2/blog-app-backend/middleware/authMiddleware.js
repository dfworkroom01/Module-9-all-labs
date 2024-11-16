const jwt = require('jsonwebtoken');

// Middleware to verify JWT token and extract user info
const authMiddleware = async (req, res, next) => {
  // Extract token from Authorization header (expected format: Bearer <token>)
  const token = req.header('Authorization')?.split(' ')[1]; // Get the token from the 'Authorization' header
  
  // If no token, return a 401 error
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token using the JWT_SECRET from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach userId from token to the request object (req.user)
    req.user = decoded.userId;  // userId is in the payload of the token

    // Move to the next middleware or route handler
    next();
  } catch (error) {
    // If token is invalid or expired, return a 401 error
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
