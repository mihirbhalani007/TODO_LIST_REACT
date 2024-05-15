import React, { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import axios from "axios";

const App = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3001/tasks");
      console.log(response.data);
      const normalizedTasks = response.data.map((task) => ({
        id: task.id,
        task: task.task,
      }));
      setTasks(normalizedTasks);
      console.log("normalized tasks:", normalizedTasks);
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

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const onUpdateTask = (updatedTasks) => {
    setTasks(updatedTasks);
  };

  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-2xl font-bold mb-4 text-center">To-Do List</h1>
      <TaskForm onAddTask={addTask} />
      <TaskList
        tasks={tasks}
        onDeleteTask={deleteTask}
        onUpdateTask={onUpdateTask}
      />
    </div>
  );
};

export default App;
