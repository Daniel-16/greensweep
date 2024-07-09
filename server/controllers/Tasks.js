import TaskModel from "../models/Tasks.js";
import VolunteerModel from "../models/Volunteer.js";

export const createTask = async (req, res) => {
  const { image, location, completeTask, reward } = req.body;
  try {
    const task = TaskModel.create({
      image,
      location,
      completeTask,
      reward,
    });
    res.status(201).json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getAllTasks = async (_req, res) => {
  try {
    const tasks = await TaskModel.find();
    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getTask = async (req, res) => {
  // const userId = req.user._id;
  const { userId } = req.params;
  const { taskId } = req.params;
  try {
    const volunteer = await VolunteerModel.findById(userId);
    if (volunteer) {
      const task = await TaskModel.findOne({ _id: taskId });
      return res.status(200).json({
        success: true,
        task,
      });
    }
    res.status(404).json({
      success: false,
      error: "Task not found",
    });
  } catch (error) {}
};
