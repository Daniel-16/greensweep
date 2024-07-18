import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";
import VolunteerModel from "../models/Volunteer.js";

export const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const user = await UserModel.findById(decodedToken.userId);
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        error: "Invalid or expired token",
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      error: "Authorization header is required",
    });
  }
};

export const authenticateVolunteer = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const volunteer = await VolunteerModel.findById(decodedToken.volunteerId);
      req.volunteer = volunteer;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        error: "Invalid or expired token",
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      error: "Authorization header is required",
    });
  }
};
