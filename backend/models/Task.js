import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    requirement: { type: mongoose.Schema.Types.ObjectId, ref: "Requirement", required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    deadline: { type: Date, required: true },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed", "Overdue"],
      default: "Pending",
    },
    notes: { type: String, default: "" },
    completedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

// Virtual flag: true if task is still open but past its deadline.
// Computed on read rather than stored, so it's always accurate without a cron job.
taskSchema.virtual("isOverdue").get(function () {
  return ["Pending", "In Progress"].includes(this.status) && this.deadline < new Date();
});

taskSchema.set("toJSON", { virtuals: true });
taskSchema.set("toObject", { virtuals: true });

export default mongoose.model("Task", taskSchema);
