const express = require("express");
const router = express.Router();
const {
  getAllDownloads,
  getDownload,
  createDownload,
  updateDownload,
  deleteDownload,
  incrementDownloadCount,
} = require("../controllers/downloadController");
const { protect, authorize } = require("../middleware/auth");
const { uploadDocument } = require("../middleware/upload");

// Public routes
router.get("/", getAllDownloads);
router.get("/:id", getDownload);
router.put("/:id/increment", incrementDownloadCount);

// Admin routes (protected)
router.post(
  "/",
  protect,
  authorize("admin"),
  uploadDocument.single("file"),
  createDownload
);
router.put(
  "/:id",
  protect,
  authorize("admin"),
  uploadDocument.single("file"),
  updateDownload
);
router.delete("/:id", protect, authorize("admin"), deleteDownload);

module.exports = router;
