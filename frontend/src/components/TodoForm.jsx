import { useState } from "react";

function TodoForm({ onAddTodo }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    onAddTodo(title);
    setTitle("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 mb-6"
    >
      <input
        type="text"
        placeholder="Enter a todo..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg transition"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;