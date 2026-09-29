import React, { useEffect, useState } from "react";
import Task from "./Task";

const Tasks = ({ tasks, refetch }) => {
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  const [selectedPriority, setSelectedPriority] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortOrder, setSortOrder] = useState("latest");

  useEffect(() => {
    let updatedTasks = [...tasks];

    // Filter by priority
    if (selectedPriority !== "All") {
      updatedTasks = updatedTasks.filter(
        (task) => task.priority === selectedPriority
      );
    }

    // Filter by status
    if (selectedStatus !== "All") {
      updatedTasks = updatedTasks.filter(
        (task) => task.status === selectedStatus
      );
    }

    // Sort by created date
    updatedTasks.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);

      return sortOrder === "latest"
        ? dateB - dateA
        : dateA - dateB;
    });

    setFilteredTasks(updatedTasks);
  }, [tasks, selectedPriority, selectedStatus, sortOrder]);

  return (
    <div className="pb-20">

      {/* Heading */}
      <p className="mx-auto pb-4 mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-white sm:text-5xl">
        My Tasks
      </p>

      <p className="text-center text-xl text-gray-400 font-semibold mb-10">
        Manage your project tasks
      </p>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">

        {/* Priority Filter */}
        <select
          className="p-2 rounded bg-gray-700 text-white"
          value={selectedPriority}
          onChange={(e) => setSelectedPriority(e.target.value)}
        >
          <option value="All">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        {/* Status Filter */}
        <select
          className="p-2 rounded bg-gray-700 text-white"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        {/* Sort */}
        <select
          className="p-2 rounded bg-gray-700 text-white"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="latest">Latest First</option>
          <option value="oldest">Oldest First</option>
        </select>

      </div>

      {/* Task Table */}
      <div className="overflow-scroll p-5">
        <table className="min-w-full bg-gray-700 text-white text-center">

          <thead className="font-bold text-xl">
            <tr>
              <th className="p-5 border-gray-900 border-4">
                No
              </th>

              <th className="p-5 border-gray-900 border-4">
                Title
              </th>

              <th className="p-5 border-gray-900 border-4">
                Description
              </th>

              <th className="p-5 border-gray-900 border-4">
                Priority
              </th>

              <th className="p-5 border-gray-900 border-4">
                Status
              </th>

              <th className="p-5 border-gray-900 border-4">
                Created Date
              </th>

              <th className="p-5 border-gray-900 border-4">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task, index) => (
                <Task
                  key={task.id}
                  task={task}
                  index={index}
                  refetch={refetch}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="p-10 text-xl text-gray-300"
                >
                  No tasks found.
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default Tasks;
