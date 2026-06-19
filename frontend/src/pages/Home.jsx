import { useEffect, useState } from "react";

import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../api/todoApi";

function Home() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  const completedTodos = todos.filter(
    (todo) => todo.completed
  ).length;

  const fetchTodos = async () => {
    try {
      setLoading(true);

      const data = await getTodos();

      setTodos(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (title) => {
    try {
      const newTodo = await createTodo(title);

      setTodos((prev) => [newTodo, ...prev]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleTodo = async (todo) => {
    try {
      const updatedTodo = await updateTodo(
        todo._id,
        {
          completed: !todo.completed,
        }
      );

      setTodos((prev) =>
        prev.map((t) =>
          t._id === todo._id
            ? updatedTodo
            : t
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);

      setTodos((prev) =>
        prev.filter(
          (todo) => todo._id !== id
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 to-blue-100 p-6">
      <div className="max-w-xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 text-center">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
            DevOps Todo App
        </h1>

        <div className="flex justify-center gap-8 text-gray-600">
            <div>
                <p className="text-sm uppercase tracking-wide">
                    Total Tasks
                </p>
                <p className="text-2xl font-semibold">
                    {todos.length}
                </p>
                </div>

                <div>
                <p className="text-sm uppercase tracking-wide">
                    Completed
                </p>
                <p className="text-2xl font-semibold text-green-600">
                    {completedTodos}
                </p>
                </div>
            </div>
        </div>

        <TodoForm
          onAddTodo={handleAddTodo}
        />

        {loading ? (
          <div className="text-center py-6">
            Loading...
          </div>
        ) : (
          <TodoList
            todos={todos}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
          />
        )}

        <footer className="text-center mt-10 text-gray-500 text-sm">
          Built with React, Express,
          MongoDB & Docker
        </footer>
      </div>
    </div>
  );
}

export default Home;