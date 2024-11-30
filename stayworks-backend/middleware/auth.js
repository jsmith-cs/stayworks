const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

const isLandlord = (req, res, next) => {
  if (req.user && req.user.role === 'landlord') {
    next();
  } else {
    res.status(403).json({ msg: 'Access denied. Landlord role required.' });
  }
};

module.exports = { authenticateToken, isLandlord };