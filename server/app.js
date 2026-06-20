import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();
connectDB();

const app = express();

// ===== Security & core middleware =====
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "10kb" }));

// ===== Health check (used by Docker/load balancers) =====
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date() });
});

// ===== Routes =====
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// ===== 404 handler =====
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ===== Global error handler =====
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    error: err.message || "Something went wrong",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
