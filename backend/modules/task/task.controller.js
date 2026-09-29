import {taskService} from "./task.service.js";

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();

    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch tasks",
    });
  }
};

// Get a single task
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await taskService.getTaskById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    console.error("Error fetching task:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch task",
    });
  }
};

// Create a task
const createTask = async (req, res) => {
  try {
    const { title, description, priority, status } = req.body;

    // Basic validation
    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    if (!priority) {
      return res.status(400).json({
        success: false,
        message: "Priority is required",
      });
    }

    const validPriorities = ["Low", "Medium", "High"];

    if (!validPriorities.includes(priority)) {
      return res.status(400).json({
        success: false,
        message: "Invalid priority",
      });
    }

    const validStatuses = ["Pending", "In Progress", "Completed"];

    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const task = await taskService.createTask({
      title: title.trim(),
      description,
      priority,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    console.error("Error creating task:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create task",
    });
  }
};

// Update a task
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, priority, status } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    const validPriorities = ["Low", "Medium", "High"];

    if (!validPriorities.includes(priority)) {
      return res.status(400).json({
        success: false,
        message: "Invalid priority",
      });
    }

    const validStatuses = ["Pending", "In Progress", "Completed"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const task = await taskService.updateTask(id, {
      title: title.trim(),
      description,
      priority,
      status,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task,
    });
  } catch (error) {
    console.error("Error updating task:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update task",
    });
  }
};

// Update task status
const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["Pending", "In Progress", "Completed"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const task = await taskService.updateTaskStatus(id, status);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task status updated successfully",
      data: task,
    });
  } catch (error) {
    console.error("Error updating task status:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update task status",
    });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await taskService.deleteTask(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data: task,
    });
  } catch (error) {
    console.error("Error deleting task:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete task",
    });
  }
};

export const taskController = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
};