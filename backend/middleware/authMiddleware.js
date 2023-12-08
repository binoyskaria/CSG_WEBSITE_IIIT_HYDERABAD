const jwt = require('jsonwebtoken');

const extractUserRoleFromToken = (authorizationHeader) => {
  try {
    const token = authorizationHeader.split(' ')[1];
    const decoded = jwt.verify(token, 'yourSecretKey');
    
    // Replace 'userRole' with the actual property that represents the user role in your JWT payload
    const userRole = decoded.userRole;

    return userRole;
  } catch (error) {
    return null;
  }
};

const isAdmin = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const userRole = extractUserRoleFromToken(authorizationHeader);

  if (userRole === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Access forbidden' });
  }
};

module.exports = { isAdmin };
