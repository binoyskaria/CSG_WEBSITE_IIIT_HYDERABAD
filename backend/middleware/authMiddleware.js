const jwt = require('jsonwebtoken');

const extractUserRoleFromToken = (authorizationHeader) => {
  try {
    const secretKey = process.env.JWT_SECRET;
    const token = authorizationHeader.split(' ')[1];

    console.log('Token:', token);

    const decoded = jwt.verify(token, secretKey);
    
    // Replace 'userRole' with the actual property that represents the user role in your JWT payload
    const userRole = decoded.userRole;

    console.log('Decoded User Role:', userRole);

    return userRole;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

const isAdmin = (req, res, next) => {
  const authorizationHeader = req.headers.Authorization;

  console.log('Authorization Header:', authorizationHeader);

  if (!authorizationHeader) {
    console.error('Authorization header missing');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const userRole = extractUserRoleFromToken(authorizationHeader);

  if (userRole === 'admin') {
    console.log('User is an admin. Access granted.');
    next();
  } else {
    console.error('User does not have admin access.');
    res.status(403).json({ error: 'Access forbidden' });
  }
};

module.exports = { isAdmin };
