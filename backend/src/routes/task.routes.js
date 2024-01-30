import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createTask,
  getAllTasks,
  getTasksByCategory,
  getTaskById,
} from "../controllers/task.controller.js";

const router = Router();

// ALPHA: post => create new task
router.route("/create").post(verifyJWT, createTask);

// ALPHA: get => get all tasks of a user and tasks of a category if user is a collaborator of that category
router.route("/get-all").get(verifyJWT, getAllTasks);

// ALPHA: get => get all tasks in a category
router.route("/get-by-category/:categoryId").get(verifyJWT, getTasksByCategory);

// ALPHA: get => get a particular task details by id
router.route("/get/:taskId").get(verifyJWT, getTaskById);

// TODO: patch => update a particular task
// TODO: delete => delete a particular task

export default router;
