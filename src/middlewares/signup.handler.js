const User = require('../models/user.model');

const checkDuplicated = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user)
      return res.status(409).json({
        error: 'Conflict',
        message: 'Username already exists.',
      });
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { checkDuplicated };
