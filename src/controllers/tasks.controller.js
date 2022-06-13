const Task = require('../models/task.model');

const createTask = async (req, res, next) => {
  try {
    const user_id = req.id;
    const data = { ...req.body, user_id };
    const task = await new Task(data);
    await task.save();

    res.status(201).json({
      message: 'Task created successfully',
      task: {
        id: task._id,
        name: task.name,
        description: task.description,
        done: task.done,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getTasks = async (req, res, next) => {
  try {
    const user_id = req.id;
    const { limit, page } = req.query;
    const tasks = await Task.find({ user_id })
      .skip(limit * page - limit)
      .limit(limit)
      .select('name description done');

    res.status(200).json({
      rows: tasks.length,
      message: 'Tasks fetched successfully',
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const user_id = req.id;
    const task_id = req.params.id;
    const data = { ...req.body, user_id };
    const task = await Task.findOneAndUpdate({ _id: task_id, user_id }, data, {
      new: true,
    });

    if (!task)
      return res.status(404).json({
        error: 'Not found',
        message: 'Task not found',
      });

    res.status(200).json({
      message: 'Task updated successfully',
      task: {
        id: task._id,
        name: task.name,
        description: task.description,
        done: task.done,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const user_id = req.id;
    const task_id = req.params.id;

    const task = await Task.findOneAndDelete({ _id: task_id, user_id });

    if (!task)
      return res.status(404).json({
        error: 'Not found',
        message: 'Task not found',
      });

    res.status(200).json({
      message: 'Task deleted successfully',
      task: {
        id: task._id,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
