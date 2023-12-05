// authMiddleware.js

const extractUserRoleFromToken = (authorizationHeader) => {
    // Replace this logic with your actual JWT decoding logic
    // For demonstration purposes, always return 'admin'
    return 'admin';
  };
  
  const isAdmin = (req, res, next) => {
    const userRole = extractUserRoleFromToken(req.headers.authorization);
  
    if (userRole === 'admin') {
      next();
    } else {
      res.status(403).json({ error: 'Access forbidden' });
    }
  };
  
  module.exports = { isAdmin };
  