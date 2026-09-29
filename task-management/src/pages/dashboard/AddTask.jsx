import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddTask = ({ setTasks }) => {
  const [createdDate, setCreatedDate] = useState(new Date());

  const addTask = async (e) => {
    e.preventDefault();

    const form = e.target;

    const task = {
      title: form.title.value,
      description: form.description.value,
      priority: form.priority.value,
      status: form.status.value,
      created_at: createdDate,
    };

    try {
      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create task");
      }

      setTasks((prev) => [...prev, data.data]);

      alert("Task created successfully");

      form.reset();
      setCreatedDate(new Date());
    } catch (error) {
      console.error("Error creating task:", error);
      alert(error.message);
    }
  };

  return (
    <div className="relative py-36 px-5">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
          Create New Task
        </h2>

        <p className="mt-2 text-lg/8 text-gray-400">
          Create and manage your project tasks.
        </p>
      </div>

      <form
        onSubmit={addTask}
        className="mx-auto mt-16 max-w-xl sm:mt-20"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">

          {/* Title */}
          <div className="sm:col-span-2">
            <label
              htmlFor="title"
              className="block text-sm/6 font-semibold text-white"
            >
              Title
            </label>

            <div className="mt-2.5">
              <input
                id="title"
                name="title"
                type="text"
                required
                minLength={3}
                maxLength={150}
                placeholder="Enter task title"
                className="block w-full rounded-md bg-gray-700 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
              />
            </div>
          </div>

          {/* Description */}
          <div className="sm:col-span-2">
            <label
              htmlFor="description"
              className="block text-sm/6 font-semibold text-white"
            >
              Description
            </label>

            <div className="mt-2.5">
              <textarea
                id="description"
                name="description"
                rows={4}
                placeholder="Describe the task"
                className="block w-full rounded-md bg-gray-700 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
              />
            </div>
          </div>

          {/* Priority */}
          <div>
            <label
              htmlFor="priority"
              className="block text-sm/6 font-semibold text-white"
            >
              Priority
            </label>

            <div className="mt-2.5">
              <select
                id="priority"
                name="priority"
                required
                defaultValue="Medium"
                className="block w-full rounded-md bg-gray-700 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          {/* Status */}
          <div>
            <label
              htmlFor="status"
              className="block text-sm/6 font-semibold text-white"
            >
              Status
            </label>

            <div className="mt-2.5">
              <select
                id="status"
                name="status"
                required
                defaultValue="Pending"
                className="block w-full rounded-md bg-gray-700 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Created Date */}
          <div className="sm:col-span-2">
            <label
              htmlFor="createdDate"
              className="block text-sm/6 font-semibold text-white"
            >
              Created Date
            </label>

            <div className="mt-2.5">
              <DatePicker
                id="createdDate"
                selected={createdDate}
                onChange={(date) => setCreatedDate(date)}
                dateFormat="yyyy-MM-dd"
                className="block w-full rounded-md bg-gray-700 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="sm:col-span-2 mt-4">
            <button
              type="submit"
              className="block w-full rounded-md bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Add Task
            </button>
          </div>

        </div>
      </form>
    </div>
  );
};

export default AddTask;
