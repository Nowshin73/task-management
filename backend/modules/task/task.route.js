const express = require("express");

const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
} = require("../controllers/task.controller");

const router = express.Router();

// GET /api/tasks
router.get("/", getAllTasks);

// GET /api/tasks/:id
router.get("/:id", getTaskById);

// POST /api/tasks
router.post("/", createTask);

// PUT /api/tasks/:id
router.put("/:id", updateTask);

// PATCH /api/tasks/:id/status
router.patch("/:id/status", updateTaskStatus);

// DELETE /api/tasks/:id
router.delete("/:id", deleteTask);

module.exports = router;