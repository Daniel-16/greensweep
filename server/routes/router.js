import express from "express";
import { createUser, loginUser } from "../controllers/UserController.js";
import {
  createVolunteer,
  loginVolunteer,
} from "../controllers/VolunteerController.js";
import {
  completeTask,
  createTask,
  getAllTasks,
  getTask,
} from "../controllers/TasksController.js";
import {
  authenticateUser,
  authenticateVolunteer,
} from "../middleware/authenticateUser.js";
const router = express.Router();

/**
 * Route for creating and signing in a regular user
 * @name createUser
 * @name loginUser
 * @function
 * @inner
 * @param {string} path
 * @param {function} middleware
 */
router.post("/createUser", createUser);
router.post("/loginUser", loginUser);

router.post("/createVolunteer", createVolunteer);
router.post("/loginVolunteer", loginVolunteer);

router.post("/createTask", authenticateUser, createTask);

router.get("/getAllTasks", authenticateUser, getAllTasks);

router.get("/getTask/:taskId", authenticateVolunteer, getTask);

router.put("/completeTask/:taskId", authenticateVolunteer, completeTask);

export default router;
