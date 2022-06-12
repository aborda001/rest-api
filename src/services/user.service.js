const boom = require('@hapi/boom');
const User = require('../models/user.model');

class userService {
  constructor() {}

  async create(data) {
    const user = new User(data);
    user.password = await User.encryptPassword(user.password);
    return await user.save();
  }

  async findOne(id) {
    const user = await User.findById(id);
    if (!user) throw new boom.notFound('User not found');
    return user;
  }

  async update(id, data) {
    const user = await this.findOne(id);
    await user.update(data);
    return {
      id: user._id,
      username: user.username,
    };
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.remove();
    return {
      id: user._id,
    };
  }
}

module.exports = userService;
