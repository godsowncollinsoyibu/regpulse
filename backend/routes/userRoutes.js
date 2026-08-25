import express from "express";
import { getUsers, createUser, updateUser } from "../controllers/userController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect, adminOnly);

router.route("/").get(getUsers).post(createUser);
router.put("/:id", updateUser);

export default router;
