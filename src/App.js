import React, { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import axios from "axios";
import SearchTask from "./components/SearchTask";

const App = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3001/tasks");
      const normalizedTasks = response.data.map((task) => ({
        id: task.id,
        task: task.task,
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

  const UpdateTask = async (updatedTask, id) => {
    try {
      const response = await axios.put(`http://localhost:3001/tasks/${id}`, {
        task: updatedTask.task,
      });

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

  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-2xl font-bold mb-4 text-center">To-Do List</h1>
      <TaskForm onAddTask={addTask} />
      <SearchTask/>
      <TaskList
        tasks={tasks}
        onDeleteTask={deleteTask}
        onUpdateTask={UpdateTask}
      />
    </div>
  );
};

export default App;
