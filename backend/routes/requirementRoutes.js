import express from "express";
import {
  getRequirements,
  getRequirementById,
  createRequirement,
  updateRequirement,
  deleteRequirement,
} from "../controllers/requirementController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.route("/").get(getRequirements).post(createRequirement);
router
  .route("/:id")
  .get(getRequirementById)
  .put(updateRequirement)
  .delete(adminOnly, deleteRequirement);

export default router;
