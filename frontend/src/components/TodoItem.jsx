function TodoItem({
  todo,
  onToggle,
  onDelete,
}) {
  return (
    <div className="bg-white shadow rounded-lg p-4 flex items-center justify-between">
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo)}
          className="mt-1"
        />

        <div>
          <p
            className={
              todo.completed
                ? "line-through text-green-600 font-medium"
                : "font-medium"
            }
          >
            {todo.title}
          </p>

          <p className="text-xs text-gray-500 mt-1">
            Created:{" "}
            {new Date(
              todo.createdAt
            ).toLocaleString()}
          </p>
        </div>
      </div>

      <button
        onClick={() => onDelete(todo._id)}
        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
      >
        Delete
      </button>
    </div>
  );
}

export default TodoItem;