import TaskModel from "../models/Tasks.js";
import VolunteerModel from "../models/Volunteer.js";
import { generateToken } from "../utils/generateToken.js";
import bcrypt from "bcrypt";

export const createVolunteer = async (req, res) => {
  const { fullname, email, phoneNumber, password } = req.body;
  try {
    const volunteer = await VolunteerModel.create({
      fullname,
      email,
      phoneNumber,
      password,
    });
    const token = generateToken({ userId: volunteer._id });
    res.status(201).json({
      success: true,
      volunteer,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const completeTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await TaskModel.findOneAndUpdate(
      { _id: id },
      { completeTask: true },
      { new: true }
    );

    if (task) {
      res.status(200).json({
        success: true,
        message: "Task completed",
        task,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const loginVolunteer = async (req, res) => {
  const { email, password } = req.body;
  try {
    const volunteer = await VolunteerModel.findOne({ email });
    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: "Not found: Volunteer does not exist",
      });
    }

    const matchPassword = await bcrypt.compare(password, volunteer.password);
    if (!matchPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken({ userId: volunteer._id });
    res.status(200).json({
      success: true,
      volunteer: {
        _id: volunteer._id,
        fullname: volunteer.fullname,
        email: volunteer.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
