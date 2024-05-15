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
      {tasks.map((task, index) => (
        <Task
          key={index}
          task={task}
          onDeleteTask={() => onDeleteTask(index)}
          onUpdateTask={(updatedTask) => handleUpdateTask(index, updatedTask)}
        />
      ))}
    </div>
  );
};

export default TaskList;
