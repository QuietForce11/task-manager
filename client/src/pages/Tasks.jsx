import { useState, useEffect } from "react";
import { api } from "../api/api";
import { useAuth } from "../context/AuthContext";
import TaskItem from "../components/TaskItem";

const statusGroups = [
  { key: "todo", label: "To Do", color: "#FF6B5B" },
  { key: "in-progress", label: "In Progress", color: "#FFD23F" },
  { key: "done", label: "Done", color: "#4ECDC4" },
];

export default function Tasks() {
  const { token, user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      const data = await api.getTasks(token);
      setTasks(data.tasks);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd(e) {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const data = await api.createTask(token, { title, priority });
      setTasks([data.task, ...tasks]);
      setTitle("");
      setPriority("medium");
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleStatusChange(task, newStatus) {
    try {
      const data = await api.updateTask(token, task._id, { status: newStatus });
      setTasks(tasks.map((t) => (t._id === task._id ? data.task : t)));
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    try {
      await api.deleteTask(token, id);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  const doneCount = tasks.filter((t) => t.status === "done").length;
  const highCount = tasks.filter((t) => t.priority === "high" && t.status !== "done").length;
  const activeCount = tasks.length - doneCount;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background glow accents */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 bg-[#FF6B5B]/20 rounded-full blur-[120px]" />
      <div className="pointer-events-none absolute top-60 -right-40 w-96 h-96 bg-[#4ECDC4]/15 rounded-full blur-[120px]" />

      <div className="relative max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-xs uppercase tracking-wide text-[#9D96B8] mb-1 font-semibold">
              {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </p>
            <h1 className="text-3xl font-black tracking-tight">
              Hi, <span className="bg-gradient-to-r from-[#FF6B5B] to-[#FFD23F] bg-clip-text text-transparent">{user?.name?.split(" ")[0]}</span>
            </h1>
          </div>
          <button
            onClick={logout}
            className="text-xs text-[#9D96B8] hover:text-[#F4F1F8] transition border-2 border-[#3A3450] rounded-xl px-3 py-1.5 font-semibold"
          >
            Log out
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-[#252033] border border-[#3A3450] rounded-xl p-4">
            <p className="text-2xl font-black">{activeCount}</p>
            <p className="text-xs text-[#9D96B8] font-medium mt-0.5">Active tasks</p>
          </div>
          <div className="bg-[#252033] border border-[#3A3450] rounded-xl p-4">
            <p className="text-2xl font-black text-[#FF3D71]">{highCount}</p>
            <p className="text-xs text-[#9D96B8] font-medium mt-0.5">High priority</p>
          </div>
          <div className="bg-[#252033] border border-[#3A3450] rounded-xl p-4">
            <p className="text-2xl font-black text-[#4ECDC4]">{doneCount}</p>
            <p className="text-xs text-[#9D96B8] font-medium mt-0.5">Completed</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-6">
          {/* Left: Add task panel */}
          <div className="lg:sticky lg:top-12 h-fit bg-[#252033] border border-[#3A3450] rounded-2xl p-5">
            <h2 className="text-sm font-bold mb-4">New task</h2>
            <form onSubmit={handleAdd} className="space-y-3">
              <input
                className="w-full bg-[#1A1625] border-2 border-[#3A3450] rounded-xl px-3 py-2.5 text-sm text-[#F4F1F8] focus:outline-none focus:border-[#FF6B5B] transition placeholder:text-[#5C5570]"
                placeholder="What needs doing?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="flex gap-1.5">
                {["low", "medium", "high"].map((p) => (
                  <button
                    type="button"
                    key={p}
                    onClick={() => setPriority(p)}
                    className={`flex-1 text-xs font-bold uppercase tracking-wide py-2 rounded-lg border-2 transition ${
                      priority === p
                        ? "border-[#FF6B5B] bg-[#FF6B5B]/10 text-[#FF6B5B]"
                        : "border-[#3A3450] text-[#9D96B8]"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <button className="w-full bg-gradient-to-r from-[#FF6B5B] to-[#FF3D71] text-white py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition shadow-lg shadow-[#FF6B5B]/20">
                Add task
              </button>
            </form>

            {error && (
              <p className="text-xs text-[#FF3D71] bg-[#FF3D71]/10 border border-[#FF3D71]/30 rounded-lg px-3 py-2 mt-3">
                {error}
              </p>
            )}
          </div>

          {/* Right: Task groups */}
          <div className="space-y-6">
            {loading ? (
              <p className="text-sm text-[#9D96B8]">Loading…</p>
            ) : tasks.length === 0 ? (
              <div className="text-center py-16 border-2 border-dashed border-[#3A3450] rounded-xl">
                <p className="text-sm text-[#9D96B8] font-medium">Nothing on your list yet.</p>
                <p className="text-xs text-[#5C5570] mt-1">Add your first task on the left.</p>
              </div>
            ) : (
              statusGroups.map((group) => {
                const groupTasks = tasks.filter((t) => t.status === group.key);
                if (groupTasks.length === 0) return null;
                return (
                  <div key={group.key}>
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: group.color }}
                      />
                      <h2 className="text-xs font-bold uppercase tracking-wide text-[#9D96B8]">
                        {group.label}
                      </h2>
                      <span className="text-xs font-mono text-[#5C5570]">{groupTasks.length}</span>
                    </div>
                    <div className="space-y-2.5">
                      {groupTasks.map((task) => (
                        <TaskItem
                          key={task._id}
                          task={task}
                          onStatusChange={handleStatusChange}
                          onDelete={handleDelete}
                        />
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}