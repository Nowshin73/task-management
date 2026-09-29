import React, { useState } from "react";

const Task = ({ task, index, refetch }) => {
  const {
    id,
    title,
    description,
    priority,
    status,
    created_at,
  } = task;

  const [showModal, setShowModal] = useState(false);

  const [taskTitle, setTaskTitle] = useState(title);
  const [taskDescription, setTaskDescription] = useState(description || "");
  const [taskPriority, setTaskPriority] = useState(priority);
  const [taskStatus, setTaskStatus] = useState(status);

  // Priority badge
  const getPriorityBadge = (priority) => {
    let color = "bg-gray-500";

    if (priority === "Low") {
      color = "bg-green-500";
    } else if (priority === "Medium") {
      color = "bg-yellow-500";
    } else if (priority === "High") {
      color = "bg-red-500";
    }

    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${color}`}
      >
        {priority}
      </span>
    );
  };

  // Status badge
  const getStatusBadge = (status) => {
    let color = "bg-gray-500";

    if (status === "Pending") {
      color = "bg-yellow-500";
    } else if (status === "In Progress") {
      color = "bg-blue-500";
    } else if (status === "Completed") {
      color = "bg-green-500";
    }

    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${color}`}
      >
        {status}
      </span>
    );
  };

  // Delete task
  const deleteTask = async (taskId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/${taskId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete task");
      }

      alert("Task deleted successfully");

      refetch();
    } catch (error) {
      console.error("Error deleting task:", error);
      alert(error.message);
    }
  };

  // Update task
  const updateTask = async (taskId) => {
    const updatedTask = {
      title: taskTitle,
      description: taskDescription,
      priority: taskPriority,
      status: taskStatus,
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTask),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update task");
      }

      alert("Task updated successfully");

      setShowModal(false);
      refetch();
    } catch (error) {
      console.error("Error updating task:", error);
      alert(error.message);
    }
  };

  // Format created date
  const formattedDate = created_at
    ? new Date(created_at).toLocaleDateString()
    : "";

  return (
    <>
      {/* Table Row */}
      <tr>
        <td className="p-5 border-4 border-gray-900">
          {index + 1}
        </td>

        <td className="p-5 border-4 border-gray-900">
          {title}
        </td>

        <td className="p-5 border-4 border-gray-900">
          <div className="max-w-xs">
            {description || "No description"}
          </div>
        </td>

        <td className="p-5 border-4 border-gray-900">
          {getPriorityBadge(priority)}
        </td>

        <td className="p-5 border-4 border-gray-900">
          {getStatusBadge(status)}
        </td>

        <td className="p-5 border-4 border-gray-900">
          {formattedDate}
        </td>

        <td className="p-5 border-4 border-gray-900">
          <div className="flex gap-2">
            <button
              onClick={() => setShowModal(true)}
              className="px-3 py-2 rounded-lg cursor-pointer bg-violet-500 hover:bg-violet-700"
            >
              Update
            </button>

            <button
              onClick={() => deleteTask(id)}
              className="px-3 py-2 rounded-lg cursor-pointer bg-red-500 hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </td>
      </tr>

      {/* Update Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-[#0000005d] flex justify-center items-center z-50">
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg w-[400px] max-w-[90%]">
            <h2 className="text-lg font-bold mb-4 text-white">
              Update Task
            </h2>

            <div className="flex flex-col items-baseline">

              {/* Title */}
              <label className="py-2 text-white">
                Title
              </label>

              <input
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                className="w-full p-2 mb-4 border rounded bg-gray-600 text-white"
                placeholder="Task title"
                required
              />

              {/* Description */}
              <label className="py-2 text-white">
                Description
              </label>

              <textarea
                value={taskDescription}
                onChange={(e) =>
                  setTaskDescription(e.target.value)
                }
                className="w-full p-2 mb-4 border rounded bg-gray-600 text-white"
                placeholder="Task description"
                rows="4"
              />

              {/* Priority */}
              <label className="py-2 text-white">
                Priority
              </label>

              <select
                value={taskPriority}
                onChange={(e) =>
                  setTaskPriority(e.target.value)
                }
                className="block w-full mb-4 rounded-md bg-gray-600 px-3.5 py-2 text-base text-white"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>

              {/* Status */}
              <label className="py-2 text-white">
                Status
              </label>

              <select
                value={taskStatus}
                onChange={(e) =>
                  setTaskStatus(e.target.value)
                }
                className="block w-full mb-4 rounded-md bg-gray-600 px-3.5 py-2 text-base text-white"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">
                  In Progress
                </option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-400 rounded hover:bg-gray-500"
              >
                Cancel
              </button>

              <button
                onClick={() => updateTask(id)}
                className="px-4 py-2 bg-blue-500 rounded text-white hover:bg-blue-700"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Task;
