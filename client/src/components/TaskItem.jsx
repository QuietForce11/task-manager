export default function TaskItem({ task, onToggleStatus, onDelete }) {
  const isDone = task.status === "done";

  return (
    <div className="flex items-center justify-between bg-white rounded-lg shadow px-4 py-3">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={isDone}
          onChange={() => onToggleStatus(task)}
          className="w-4 h-4"
        />
        <div>
          <p className={isDone ? "line-through text-gray-400" : "text-gray-800"}>
            {task.title}
          </p>
          {task.description && (
            <p className="text-xs text-gray-500">{task.description}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            task.priority === "high"
              ? "bg-red-100 text-red-700"
              : task.priority === "low"
              ? "bg-gray-100 text-gray-600"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {task.priority}
        </span>
        <button
          onClick={() => onDelete(task._id)}
          className="text-red-500 text-sm font-semibold"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
