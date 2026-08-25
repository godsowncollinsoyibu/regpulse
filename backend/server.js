import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import requirementRoutes from "./routes/requirementRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "*" }));
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ status: "RegPulse API is running" }));

app.use("/api/auth", authRoutes);
app.use("/api/requirements", requirementRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/users", userRoutes);

// 404 handler
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`RegPulse API running on port ${PORT}`));
