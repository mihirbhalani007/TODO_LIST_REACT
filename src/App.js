import React, { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import axios from "axios";
import SearchTask from "./components/SearchTask";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3001/tasks");
      const normalizedTasks = response.data.map((task) => ({
        id: task.id,
        task: task.task,
        completed: task.completed || false,
      }));
      setTasks(normalizedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (task) => {
    const response = await axios.post("http://localhost:3001/tasks", {
      task,
      completed: false,
    });
    setTasks([...tasks, response.data]);
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/tasks/${id}`);
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const updateTask = async (updatedTask, id) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/tasks/${id}`,
        updatedTask
      );
      const editedTasks = tasks.map((task) => {
        if (task.id === id) {
          return { ...task, ...response.data };
        }
        return task;
      });
      setTasks(editedTasks);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const toggleTaskCompletion = async (id) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      const updatedTask = { ...task, completed: !task.completed };
      await updateTask(updatedTask, id);
    }
  };

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
        <TaskForm onAddTask={addTask} />
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
          onDeleteTask={deleteTask}
          onUpdateTask={updateTask}
          onToggleTaskCompletion={toggleTaskCompletion}
        />
      </div>
    </div>
  );
};

export default App;
