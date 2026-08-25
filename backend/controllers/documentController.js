import Document from "../models/Document.js";

// NOTE: This stores a file reference (name + URL) rather than handling binary
// upload storage directly. Pair with a simple disk/cloud upload step on the
// frontend (or add multer here) when wiring up real file uploads.

export const getDocumentsForTask = async (req, res) => {
  try {
    const documents = await Document.find({ task: req.params.taskId }).populate("uploadedBy", "name");
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch documents", error: error.message });
  }
};

export const addDocument = async (req, res) => {
  try {
    const { task, fileName, fileUrl } = req.body;
    const document = await Document.create({
      task,
      fileName,
      fileUrl,
      uploadedBy: req.user._id,
    });
    res.status(201).json(document);
  } catch (error) {
    res.status(500).json({ message: "Failed to add document", error: error.message });
  }
};

export const deleteDocument = async (req, res) => {
  try {
    const document = await Document.findByIdAndDelete(req.params.id);
    if (!document) return res.status(404).json({ message: "Document not found" });
    res.json({ message: "Document deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete document", error: error.message });
  }
};
