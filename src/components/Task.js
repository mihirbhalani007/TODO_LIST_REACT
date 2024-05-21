import React, { useEffect, useState } from "react";

const Task = ({
  task,
  onDeleteTask,
  onUpdateTask,
  onToggleTaskCompletion,
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
    setEditingIndex();
  };

  const handleSave = () => {
    clearEditing();
    onUpdateTask(editedTask);
  };

  const handleChange = (e) => {
    setEditedTask({ ...editedTask, task: e.target.value });
  };

  return (
    <div className="flex items-center justify-between p-4 mb-2 bg-white rounded shadow transition duration-300 ease-in-out hover:bg-gray-100 hover:scale-95">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={onToggleTaskCompletion}
        className="form-checkbox mr-4"
      />
      {editing ? (
        <input
          type="text"
          value={editedTask.task}
          onChange={handleChange}
          maxLength="30"
          autoFocus
          spellCheck="false"
          className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 mr-4"
        />
      ) : (
        <div className="flex-grow text-left">
          <span className="text-lg">{serialNumber}. </span>
          <span className={`text-lg ${task.completed ? "line-through" : ""}`}>
            {task.task}
          </span>
        </div>
      )}
      <div className="flex space-x-2">
        {editing ? (
          <button
            onClick={handleSave}
            className="bg-green-600 text-white p-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-300"
          >
            Save
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-300"
          >
            Edit
          </button>
        )}
        <button
          onClick={onDeleteTask}
          className="bg-red-600 text-white p-2 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
