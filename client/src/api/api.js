const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, { method = "GET", body, token } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Something went wrong");
  }
  return data;
}

export const api = {
  signup: (name, email, password) =>
    request("/auth/signup", { method: "POST", body: { name, email, password } }),

  login: (email, password) =>
    request("/auth/login", { method: "POST", body: { email, password } }),

  getTasks: (token) => request("/tasks", { token }),

  createTask: (token, task) => request("/tasks", { method: "POST", body: task, token }),

  updateTask: (token, id, updates) =>
    request(`/tasks/${id}`, { method: "PUT", body: updates, token }),

  deleteTask: (token, id) => request(`/tasks/${id}`, { method: "DELETE", token }),
};
