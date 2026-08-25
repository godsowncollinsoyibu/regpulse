import express from "express";
import { getDocumentsForTask, addDocument, deleteDocument } from "../controllers/documentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/task/:taskId", getDocumentsForTask);
router.post("/", addDocument);
router.delete("/:id", deleteDocument);

export default router;
