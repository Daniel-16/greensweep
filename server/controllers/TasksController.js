import TaskModel from "../models/Tasks.js";
import VolunteerModel from "../models/Volunteer.js";
import UserModel from "../models/User.js";

export const createTask = async (req, res) => {
  const userId = req.user._id;
  const { image, location, completeTask, reward } = req.body;
  try {
    const user = await UserModel.findById(userId);
    if (user) {
      const task = TaskModel.create({
        image,
        location,
        // completeTask,
        // reward,
      });
      return res.status(201).json({
        success: true,
        task,
      });
    }
    res.status(404).json({
      success: false,
      message: "User not found",
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
  const { volunteer } = req;

  if (!volunteer || !volunteer._id) {
    return res.status(400).json({
      success: false,
      message: "Invalid token. User must be a volunteer to get tasks.",
    });
  }

  const volunteerId = volunteer._id;
  const { taskId } = req.params;
  try {
    const volunteer = await VolunteerModel.findById(volunteerId);
    if (volunteer) {
      const task = await TaskModel.findById(taskId);
      return res.status(200).json({
        success: true,
        task,
      });
    }
    res.status(404).json({
      success: false,
      message: "User not found. Must be a volunteer to get tasks.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const completeTask = async (req, res) => {
  const { volunteer } = req;
  if (!volunteer || !volunteer._id) {
    return res.status(400).json({
      success: false,
      message: "Invalid token. User must be a volunteer to get tasks.",
    });
  }

  const volunteerId = volunteer._id;
  const { taskId } = req.params;
  try {
    const volunteer = await VolunteerModel.findById(volunteerId);
    if (volunteer) {
      const task = await TaskModel.findByIdAndUpdate(taskId, {
        completeTask: true,
      });
      res.status(201).json({
        success: true,
        task,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
