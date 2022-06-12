const Joi = require('joi');

const id = Joi.string().length(24);
const username = Joi.string().min(5).max(20);
const password = Joi.string().min(8);

const createUserSchema = Joi.object({
  username: username.required(),
  password: password.required(),
});

const updateUserSchema = Joi.object({
  username: username,
  password: password,
});

deleteUserSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  deleteUserSchema,
};
