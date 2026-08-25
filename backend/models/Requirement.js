import mongoose from "mongoose";

const requirementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    category: {
      type: String,
      enum: ["Data Protection", "Licensing", "Reporting", "Anti-Money Laundering", "Tax", "Other"],
      default: "Other",
    },
    frequency: {
      type: String,
      enum: ["One-time", "Monthly", "Quarterly", "Annually"],
      default: "One-time",
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Requirement", requirementSchema);
