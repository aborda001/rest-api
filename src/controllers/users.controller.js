const userService = require('../services/user.service');

const service = new userService();

const createUser = async (req, res, next) => {
  try {
    const data = req.body;
    const newUser = await service.create(data);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedUser = await service.update(id, data);
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await service.delete(id);
    res.status(200).json(deletedUser);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
};
