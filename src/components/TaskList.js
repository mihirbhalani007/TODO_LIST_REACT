import React from "react";
import Task from "./Task";

const TaskList = ({ tasks, onDeleteTask, onUpdateTask }) => {
  const handleUpdateTask = (taskIndex, updatedTask) => {
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = updatedTask;
    onUpdateTask(updatedTask, updatedTasks[taskIndex].id);
  };

  return (
    <div>
      {tasks.map((task, index) => (
        <Task
          key={task.id}
          task={task}
          onDeleteTask={() => onDeleteTask(task.id)}
          onUpdateTask={(updatedTask) => handleUpdateTask(index, updatedTask)}
        />
      ))}
    </div>
  );
};

export default TaskList;
