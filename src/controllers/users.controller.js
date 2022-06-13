const User = require('../models/user.model');

const createUser = async (req, res, next) => {
  try {
    const data = req.body;
    const user = await new User(data);
    user.password = await User.encryptPassword(user.password);
    const newUser = await user.save();
    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser._id,
        username: newUser.username,
      },
    });
  } catch (error) {
    next(error);
  }
};
const updateUser = async (req, res, next) => {
  try {
    const { id } = req;
    const data = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updatedUser)
      return res.status(404).json({
        error: 'Not found',
        message: 'User not found',
      });

    res.status(200).json({
      message: 'User updated successfully',
      user: {
        id,
        username: data.username,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser)
      return res.status(404).json({
        error: 'Not found',
        message: 'User not found',
      });

    res.status(200).json({
      message: 'User deleted successfully',
      user: {
        id,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
};
