import React, { useState } from "react";
import Task from "./Task";

const TaskList = ({ tasks, onDeleteTask, onUpdateTask }) => {
  const [editingTndex, setEditingIndex] = useState(null);

  const handleUpdateTask = (taskIndex, updatedTask) => {
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = updatedTask;
    onUpdateTask(updatedTask, updatedTasks[taskIndex].id);
    setEditingIndex(null);
  };
  const handleSetEditingIndex = (index) => {
    setEditingIndex(index);
  }

  return (
    <div>
      {tasks.map((task, index) => (
        <Task
          key={task.id}
          task={task}
          onDeleteTask={() => onDeleteTask(task.id)}
          onUpdateTask={(updatedTask) => handleUpdateTask(index, updatedTask)}
          isEditing={editingTndex === index}
          setEditingIndex={() => handleSetEditingIndex(index)}
          clearEditing={() => setEditingIndex(null)}
          serialNumber={index + 1} 
        />
      ))}
    </div>
  );
};

export default TaskList;
