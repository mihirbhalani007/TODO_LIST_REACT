import { useState, useEffect } from "react";
import { addTask, updateTask, deleteTask, fetchTasks } from "../components/Api";

const useTask = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    getTasks();
  }, []);

  const handleAddTask = async (task) => {
    try {
      const newTask = await addTask(task);
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleUpdateTask = async (updatedTask, id) => {
    try {
      const newTask = await updateTask(updatedTask, id);
      setTasks(tasks.map((task) => (task.id === id ? newTask : task)));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleToggleTaskCompletion = async (id) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      const updatedTask = { ...task, completed: !task.completed };
      await handleUpdateTask(updatedTask, id);
    }
  };

  return {
    tasks,
    handleAddTask,
    handleDeleteTask,
    handleUpdateTask,
    handleToggleTaskCompletion
  };
};

export default useTask;
