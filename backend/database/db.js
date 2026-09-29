import { Pool } from "pg";
import config from "../config/index.js";


export const pool = new Pool({
  connectionString: config.connection_str
});

export const initDB = async () => {
  await pool.query(`
       CREATE TABLE IF NOT EXISTS tasks(
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    priority VARCHAR(10) NOT NULL
        CHECK (priority IN ('Low', 'Medium', 'High')),
    status VARCHAR(20) NOT NULL DEFAULT 'Pending'
        CHECK (status IN ('Pending', 'In Progress', 'Completed')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
     `);
  console.log("db connected")
};
