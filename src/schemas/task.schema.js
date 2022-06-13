const Joi = require('joi');

const id = Joi.string().length(24);
const name = Joi.string().min(2).max(30);
const description = Joi.string().min(5).max(100);
const done = Joi.boolean();

const createTaskSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  done: done,
});

const updateTaskSchema = Joi.object({
  name: name,
  description: description,
  done: done,
});

const deleteTaskSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createTaskSchema,
  updateTaskSchema,
  deleteTaskSchema,
};
