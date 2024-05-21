import React, { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import SearchTask from "./components/SearchTask";
import useTask from "./hooks/useTask";

const App = () => {
  const [search, setSearch] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);
  const {
    tasks,
    handleAddTask,
    handleDeleteTask,
    handleUpdateTask,
    handleToggleTaskCompletion,
  } = useTask();

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredTasks = tasks.filter((task) =>
    task.task.toLowerCase().includes(search.toLowerCase())
  );

  const tasksToShow = filteredTasks.filter(
    (task) => showCompleted || !task.completed
  );
  
  return (
    <div className="container mx-auto p-4">
      <div className="bg-blue-600 text-white text-center py-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold">To-Do List</h1>
      </div>
      <div className="mt-4">
        <TaskForm onAddTask={handleAddTask} />
        <SearchTask handleInputChange={handleInputChange} search={search} />
        <div className="flex items-center justify-between p-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showCompleted}
              onChange={() => setShowCompleted(!showCompleted)}
              className="form-checkbox"
            />
            <span className="italic">Show Completed Tasks</span>
          </label>
        </div>
        <TaskList
          tasks={tasksToShow}
          onDeleteTask={handleDeleteTask}
          onUpdateTask={handleUpdateTask}
          onToggleTaskCompletion={handleToggleTaskCompletion}
        />
      </div>
    </div>
  );
};

export default App;
