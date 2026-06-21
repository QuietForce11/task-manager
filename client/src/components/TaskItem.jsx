import { useState } from "react";

const priorityConfig = {
  high: { bar: "#FF3D71", badge: "text-[#FF3D71] bg-[#FF3D71]/15" },
  medium: { bar: "#FFD23F", badge: "text-[#FFD23F] bg-[#FFD23F]/15" },
  low: { bar: "#4ECDC4", badge: "text-[#4ECDC4] bg-[#4ECDC4]/15" },
};

// Clicking the dot cycles: todo -> in-progress -> done -> todo
const nextStatus = {
  todo: "in-progress",
  "in-progress": "done",
  done: "todo",
};

export default function TaskItem({ task, onStatusChange, onDelete }) {
  const [popping, setPopping] = useState(false);
  const isDone = task.status === "done";
  const isInProgress = task.status === "in-progress";
  const config = priorityConfig[task.priority];

  function handleClick() {
    setPopping(true);
    onStatusChange(task, nextStatus[task.status]);
    setTimeout(() => setPopping(false), 300);
  }

  return (
    <div
      className="group flex items-center gap-3 bg-[#252033] rounded-xl pl-0 pr-4 py-3.5 overflow-hidden border border-[#3A3450] hover:border-[#5C5570] transition"
      style={{ borderLeftWidth: "4px", borderLeftColor: config.bar }}
    >
      <button
        onClick={handleClick}
        aria-label="Change status"
        className={`ml-4 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${popping ? "task-pop" : ""} ${
          isDone
            ? "bg-gradient-to-br from-[#FF6B5B] to-[#FFD23F] border-transparent"
            : isInProgress
            ? "border-[#FFD23F] bg-[#FFD23F]/20"
            : "border-[#5C5570] hover:border-[#FF6B5B]"
        }`}
      >
        {isDone && (
          <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
            <path
              d="M1.5 5L4 7.5L8.5 2"
              stroke="#1A1625"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        {isInProgress && <span className="w-2 h-2 rounded-full bg-[#FFD23F]" />}
      </button>

      <div className="flex-1 min-w-0">
        <p
          className={`text-sm transition ${
            isDone ? "line-through text-[#5C5570]" : "text-[#F4F1F8] font-medium"
          }`}
        >
          {task.title}
        </p>
        {task.description && (
          <p className="text-xs text-[#9D96B8] mt-0.5 truncate">{task.description}</p>
        )}
      </div>

      <span className={`text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${config.badge}`}>
        {task.priority}
      </span>

      <button
        onClick={() => onDelete(task._id)}
        aria-label="Delete task"
        className="opacity-0 group-hover:opacity-100 text-[#5C5570] hover:text-[#FF3D71] transition text-sm px-1"
      >
        ✕
      </button>
    </div>
  );
}