import express from "express";
import {
  getTasks,
  createTask,
  updateTaskStatus,
  updateTask,
  deleteTask,
  getDashboardStats,
} from "../controllers/taskController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/dashboard-stats", getDashboardStats);
router.route("/").get(getTasks).post(createTask);
router.patch("/:id/status", updateTaskStatus);
router.route("/:id").put(updateTask).delete(adminOnly, deleteTask);

export default router;
