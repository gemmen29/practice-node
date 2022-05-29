const Task = require('../models/Task');

const getAllTasks = async (req, res) => {
  try {
    const allTasks = await Task.find({});
    res.status(200).json({ allTasks });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findOne({ _id: taskId });

    if (!task) {
      return res
        .status(404)
        .json({ message: `No Task found with id: ${taskId}` });
    }

    res.status(200).json({ task });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateTask = (req, res) => {
  res.send('Update Task');
};

const deleteTask = (req, res) => {
  res.send('Delete Task');
};

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
