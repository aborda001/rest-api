const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const User = require('../models/user.model');

const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user)
      return res.status(401).json({
        message: 'Invalid credentials',
        token: null,
      });

    const matchPassword = await User.comparePassword(
      req.body.password,
      user.password
    );

    if (!matchPassword)
      return res.status(401).json({
        message: 'Invalid credentials',
        token: null,
      });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: 86400, // 24 hours
    });

    res.status(200).json({
      message: 'Signin success',
      token,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { signin };
