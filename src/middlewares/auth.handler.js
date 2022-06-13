const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/user.model');

const verifyToken = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token)
    return res.status(401).json({
      message: 'No token provided.',
      token: null,
    });

  try {
    const decoded = await jwt.verify(token, config.JWT_SECRET);
    const user = await User.findById(decoded.id);
    req.id = decoded.id;
    if (!user)
      return res.status(401).json({
        message: 'Token invalid or expired.',
        token: null,
      });
    next();
  } catch (err) {
    return res.status(401).json({
      message: 'Token invalid or expired.',
      token: null,
    });
  }
};

module.exports = {
  verifyToken,
};
