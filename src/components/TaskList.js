import React from "react";
import Task from "./Task";

const TaskList = ({ tasks, onDeleteTask, onUpdateTask }) => {
  const handleUpdateTask = (taskIndex, updatedTask) => {
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = updatedTask;
    onUpdateTask(updatedTasks);
  };

  return (
    <div>
      {tasks.map((task, id) => (
        <Task
          key={id}
          task={task}
          onDeleteTask={() => onDeleteTask(id)}
          onUpdateTask={(updatedTask) => handleUpdateTask(id, updatedTask)}
        />
      ))}
    </div>
  );
};

export default TaskList;
