import Task from "../models/Task.js";

// GET /api/tasks — only this user's tasks
export async function getTasks(req, res) {
  const tasks = await Task.find({ owner: req.userId }).sort({ createdAt: -1 });
  res.json({ tasks });
}

// POST /api/tasks
export async function createTask(req, res) {
  const { title, description, status, priority, dueDate } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const task = await Task.create({
    title,
    description,
    status,
    priority,
    dueDate,
    owner: req.userId,
  });

  res.status(201).json({ task });
}

// PUT /api/tasks/:id
export async function updateTask(req, res) {
  const task = await Task.findOne({ _id: req.params.id, owner: req.userId });
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  const { title, description, status, priority, dueDate } = req.body;
  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (status !== undefined) task.status = status;
  if (priority !== undefined) task.priority = priority;
  if (dueDate !== undefined) task.dueDate = dueDate;

  await task.save();
  res.json({ task });
}

// DELETE /api/tasks/:id
export async function deleteTask(req, res) {
  const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.userId });
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  res.json({ message: "Task deleted" });
}
