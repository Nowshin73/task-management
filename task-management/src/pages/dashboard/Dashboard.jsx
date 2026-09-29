import React, { useCallback, useEffect, useState } from "react";
import AddTask from "./AddTask";
import Tasks from "./Tasks";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/api/tasks");

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch tasks");
      }

      setTasks(data.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="bg-gray-900 min-h-screen pb-20">

      {/* Add Task */}
      <AddTask setTasks={setTasks} />

      {/* Tasks */}
      <div className="tasks">
        <Tasks
          tasks={tasks}
          refetch={fetchTasks}
        />
      </div>

    </div>
  );
};

export default Dashboard;
