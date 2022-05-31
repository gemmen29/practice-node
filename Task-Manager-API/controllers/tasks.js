const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');
const createCustomAPIError = require('../errors/custom-error');

const getAllTasks = asyncWrapper(async (req, res) => {
  const allTasks = await Task.find({});
  res.status(200).json({ allTasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOne({ _id: taskId });

  if (!task) {
    return next(createCustomAPIError(`No Task found with id: ${taskId}`, 404));
  }

  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(createCustomAPIError(`No Task found with id: ${taskId}`, 404));
  }

  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskId });

  if (!task) {
    return next(createCustomAPIError(`No Task found with id: ${taskId}`, 404));
  }

  res.status(200).json({ task });
});

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
