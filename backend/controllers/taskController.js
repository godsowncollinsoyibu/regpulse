import Task from "../models/Task.js";
import Requirement from "../models/Requirement.js";

export const getTasks = async (req, res) => {
  try {
    const { status, assignedTo, from, to } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (assignedTo) filter.assignedTo = assignedTo;
    if (from || to) {
      filter.deadline = {};
      if (from) filter.deadline.$gte = new Date(from);
      if (to) filter.deadline.$lte = new Date(to);
    }

    const tasks = await Task.find(filter)
      .populate("requirement", "title category")
      .populate("assignedTo", "name email")
      .sort({ deadline: 1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks", error: error.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const { requirement, assignedTo, deadline, notes } = req.body;
    const task = await Task.create({ requirement, assignedTo, deadline, notes });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to create task", error: error.message });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const update = { status };
    if (status === "Completed") update.completedAt = new Date();

    const task = await Task.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to update task status", error: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to update task", error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task", error: error.message });
  }
};

// @desc  Dashboard summary stats
export const getDashboardStats = async (req, res) => {
  try {
    const now = new Date();
    const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const [totalRequirements, overdue, dueThisWeek, completedThisMonth, upcoming] = await Promise.all([
      Requirement.countDocuments(),
      Task.countDocuments({ status: { $in: ["Pending", "In Progress"] }, deadline: { $lt: now } }),
      Task.countDocuments({
        status: { $in: ["Pending", "In Progress"] },
        deadline: { $gte: now, $lte: weekFromNow },
      }),
      Task.countDocuments({ status: "Completed", completedAt: { $gte: monthStart } }),
      Task.find({ status: { $in: ["Pending", "In Progress"] } })
        .populate("requirement", "title")
        .populate("assignedTo", "name")
        .sort({ deadline: 1 })
        .limit(5),
    ]);

    res.json({ totalRequirements, overdue, dueThisWeek, completedThisMonth, upcoming });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch dashboard stats", error: error.message });
  }
};
