import React, { useState } from "react";

const TaskForm = ({ onAddTask }) => {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    onAddTask(task);
    setTask("");
  };

  return (
    <div className="grid place-items-center">
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task"
          className="border rounded p-2 mr-2 w-64 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
