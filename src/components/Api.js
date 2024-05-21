import axios from "axios";

const fetchTasks = async () => {
  const response = await axios.get("http://localhost:3001/tasks");
  return response.data;
};

const addTask = async (task) => {
  const response = await axios.post("http://localhost:3001/tasks", {
    task,
    completed: false,
  });
  return response.data;
};

const deleteTask = async (id) => {
  await axios.delete(`http://localhost:3001/tasks/${id}`);
};

const updateTask = async (updatedTask, id) => {
  const response = await axios.put(
    `http://localhost:3001/tasks/${id}`,
    updatedTask
  );
  return response.data;
};

export { addTask, deleteTask, updateTask, fetchTasks };
