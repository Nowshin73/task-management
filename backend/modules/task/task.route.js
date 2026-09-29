import express from "express";
import {
  taskController
} from"./task.controller.js";

const router = express.Router();


router.get("/", taskController.getAllTasks);
router.get("/:id", taskController.getTaskById);
router.post("/", taskController.createTask);
router.put("/:id", taskController.updateTask);
router.patch("/:id/status", taskController.updateTaskStatus);
router.delete("/:id", taskController.deleteTask);

export const taskRoutes = router;