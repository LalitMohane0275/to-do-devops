import TodoItem from "./TodoItem";

function TodoList({
  todos,
  onToggle,
  onDelete,
}) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-5xl mb-3">📝</p>

        <p className="text-gray-500">
          No tasks yet. Add your first task.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TodoList;