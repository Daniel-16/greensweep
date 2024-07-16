import express from "express";
import { createUser, loginUser } from "../controllers/UserController.js";
import {
  completeTask,
  createVolunteer,
  loginVolunteer,
} from "../controllers/VolunteerController.js";
import {
  createTask,
  getAllTasks,
  getTask,
} from "../controllers/TasksController.js";
import { authenticateUser } from "../middleware/authenticateUser.js";
const router = express.Router();

router.post("/createUser", createUser);
router.post("/loginUser", loginUser);

router.post("/createVolunteer", createVolunteer);
router.post("/loginVolunteer", loginVolunteer);

router.post("/createTask", authenticateUser, createTask);
router.put("/completeTask/:id", completeTask);

router.get("/getAllTasks", authenticateUser, getAllTasks);
router.get("/getTask/:userId/:taskId", getTask);

export default router;
