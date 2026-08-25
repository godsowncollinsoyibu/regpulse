import Requirement from "../models/Requirement.js";
import Task from "../models/Task.js";

export const getRequirements = async (req, res) => {
  try {
    const requirements = await Requirement.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });
    res.json(requirements);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch requirements", error: error.message });
  }
};

export const getRequirementById = async (req, res) => {
  try {
    const requirement = await Requirement.findById(req.params.id).populate("createdBy", "name email");
    if (!requirement) return res.status(404).json({ message: "Requirement not found" });

    const tasks = await Task.find({ requirement: requirement._id }).populate("assignedTo", "name email");
    res.json({ requirement, tasks });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch requirement", error: error.message });
  }
};

export const createRequirement = async (req, res) => {
  try {
    const { title, description, category, frequency } = req.body;
    const requirement = await Requirement.create({
      title,
      description,
      category,
      frequency,
      createdBy: req.user._id,
    });
    res.status(201).json(requirement);
  } catch (error) {
    res.status(500).json({ message: "Failed to create requirement", error: error.message });
  }
};

export const updateRequirement = async (req, res) => {
  try {
    const requirement = await Requirement.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!requirement) return res.status(404).json({ message: "Requirement not found" });
    res.json(requirement);
  } catch (error) {
    res.status(500).json({ message: "Failed to update requirement", error: error.message });
  }
};

export const deleteRequirement = async (req, res) => {
  try {
    const requirement = await Requirement.findByIdAndDelete(req.params.id);
    if (!requirement) return res.status(404).json({ message: "Requirement not found" });
    await Task.deleteMany({ requirement: requirement._id });
    res.json({ message: "Requirement and its tasks were deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete requirement", error: error.message });
  }
};
