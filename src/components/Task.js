import React, { useEffect, useState } from "react";

const Task = ({
  task,
  onDeleteTask,
  onUpdateTask,
  isEditing,
  setEditingIndex,
  clearEditing,
  serialNumber,
}) => {
  const [editing, setEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  useEffect(() => {
    setEditing(isEditing);
  }, [isEditing]);

  const handleEdit = () => {
    // setEditing(true);
    setEditingIndex();
  };

  const handleSave = () => {
    // setEditing(false);
    clearEditing();
    onUpdateTask(editedTask);
  };

  const handleChange = (e) => {
    setEditedTask({ ...editedTask, task: e.target.value });
  };

  return (
    <div className="flex items-center justify-between border-b py-3 hover:bg-gray-200 rounded-md delay-100 ease-in-out">
      {editing ? (
        <input
          type="text"
          value={editedTask.task}
          onChange={handleChange}
          maxLength="30"
          autoFocus
          spellCheck="false"
          className="focus:outline-none focus:bg-gray-100 rounded mx-5 w-60 text-blue-500"
        />
      ) : (
        <div>
          <span className="text-lg mx-5">{serialNumber} </span>
          <span className="text-lg mx-5">{task.task}</span>
        </div>
      )}
      <div>
        {editing ? (
          <button
            onClick={handleSave}
            className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600"
          >
            Save
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600"
          >
            Edit
          </button>
        )}
        <button
          className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600"
          onClick={onDeleteTask}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
