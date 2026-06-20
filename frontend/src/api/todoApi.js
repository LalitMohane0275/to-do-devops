import axios from "axios";

const api = axios.create({
  baseURL: "http://3.27.142.161:3000/api/todos",
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