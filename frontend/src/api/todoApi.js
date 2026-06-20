import axios from "axios";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: `${VITE_BASE_URL}/api/todos`,
});

export const getTodos = async () => {
  const response = await api.get("/");
  return response.data.data;
};

export const createTodo = async (title) => {
  const response = await api.post("/", { title });
  return response.data.data;
};

export const updateTodo = async (id, updates) => {
  const response = await api.put(`/${id}`, updates);
  return response.data.data;
};

export const deleteTodo = async (id) => {
  await api.delete(`/${id}`);
};