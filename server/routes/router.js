import express from "express";
import { createUser, loginUser } from "../controllers/UserController.js";
import {
  completeTask,
  createVolunteer,
} from "../controllers/VolunteerController.js";
import { createTask, getAllTasks, getTask } from "../controllers/Tasks.js";
import { authenticateUser } from "../middleware/authenticateUser.js";
const router = express.Router();

router.post("/createUser", createUser);
router.post("/loginUser", loginUser, authenticateUser);

router.post("/createVolunteer", createVolunteer);
router.post("/createTask", createTask);
router.put("/completeTask/:id", completeTask);
router.get("/getAllTasks", getAllTasks);
router.get("/getTask/:userId/:taskId", getTask);

export default router;
