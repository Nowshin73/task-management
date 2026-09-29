Task Management Portal

A full-stack task management application built with React, Node.js, Express.js, and PostgreSQL (Neon).

Features
Create, view, update, and delete tasks
Task priority: Low, Medium, High
Task status: Pending, In Progress, Completed
Filter tasks by priority and status
Sort tasks by creation date
Responsive React UI
PostgreSQL database integration
REST API with Express.js
Tech Stack

Frontend

React
Tailwind CSS

Backend

Node.js
Express.js
PostgreSQL
Neon Database
Setup
Backend
cd backend
npm install

Create a .env file:

CONNECTION_STR=your_neon_database_connection_string
PORT=5000

Start the server:

npm run dev
Frontend
cd frontend
npm install
npm run dev

Make sure the backend is running on:

http://localhost:5000
API Endpoints
Method	Endpoint	Description
GET	/api/tasks	Get all tasks
GET	/api/tasks/:id	Get a task
POST	/api/tasks	Create a task
PUT	/api/tasks/:id	Update a task
PATCH	/api/tasks/:id/status	Update task status
DELETE	/api/tasks/:id	Delete a task
Author

Nowshin Nawar
B.Sc. & M.Sc. in Computer Science & Engineering