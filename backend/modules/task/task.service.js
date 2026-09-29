import {pool} from "../../database/db.js";

// Get all tasks
const getAllTasks = async () => {
  const result = await pool.query(
    "SELECT * FROM tasks ORDER BY created_at DESC"
  );

  return result.rows;
};

// Get a single task by ID
const getTaskById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM tasks WHERE id = $1",
    [id]
  );

  return result.rows[0];
};

// Create new task
const createTask = async (taskData) => {
  const { title, description, priority, status } = taskData;

  const result = await pool.query(
    `INSERT INTO tasks 
      (title, description, priority, status)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [title, description, priority, status || "Pending"]
  );

  return result.rows[0];
};

// Update a task
const updateTask = async (id, taskData) => {
  const { title, description, priority, status } = taskData;

  const result = await pool.query(
    `UPDATE tasks
     SET title = $1,
         description = $2,
         priority = $3,
         status = $4
     WHERE id = $5
     RETURNING *`,
    [title, description, priority, status, id]
  );

  return result.rows[0];
};

// Update only task status
const updateTaskStatus = async (id, status) => {
  const result = await pool.query(
    `UPDATE tasks
     SET status = $1
     WHERE id = $2
     RETURNING *`,
    [status, id]
  );

  return result.rows[0];
};

// Delete a task
const deleteTask = async (id) => {
  const result = await pool.query(
    "DELETE FROM tasks WHERE id = $1 RETURNING *",
    [id]
  );

  return result.rows[0];
};

export const taskService = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
};