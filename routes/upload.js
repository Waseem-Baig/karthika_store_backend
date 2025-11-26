const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { protect, authorize } = require("../middleware/auth");
const fs = require("fs");
const path = require("path");

// @desc    Upload single image
// @route   POST /api/upload
// @access  Private/Admin
router.post(
  "/",
  protect,
  authorize("admin"),
  upload.single("image"),
  (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Please upload a file",
        });
      }

      // Return the file URL
      const fileUrl = `/uploads/${req.file.filename}`;

      res.status(200).json({
        success: true,
        message: "File uploaded successfully",
        data: {
          filename: req.file.filename,
          url: fileUrl,
          size: req.file.size,
          mimetype: req.file.mimetype,
        },
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({
        success: false,
        message: "Error uploading file",
        error: error.message,
      });
    }
  }
);

// @desc    Upload multiple images
// @route   POST /api/upload/multiple
// @access  Private/Admin
router.post(
  "/multiple",
  protect,
  authorize("admin"),
  upload.array("images", 5),
  (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Please upload at least one file",
        });
      }

      // Return array of file URLs
      const files = req.files.map((file) => ({
        filename: file.filename,
        url: `/uploads/${file.filename}`,
        size: file.size,
        mimetype: file.mimetype,
      }));

      res.status(200).json({
        success: true,
        message: `${files.length} file(s) uploaded successfully`,
        data: files,
      });
    } catch (error) {
      console.error("Error uploading files:", error);
      res.status(500).json({
        success: false,
        message: "Error uploading files",
        error: error.message,
      });
    }
  }
);

// @desc    Delete uploaded image
// @route   DELETE /api/upload/:filename
// @access  Private/Admin
router.delete("/:filename", protect, authorize("admin"), (req, res) => {
  try {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, "../uploads", filename);

    // Check if file exists
    if (!fs.existsSync(filepath)) {
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }

    // Delete file
    fs.unlinkSync(filepath);

    res.status(200).json({
      success: true,
      message: "File deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting file",
      error: error.message,
    });
  }
});

module.exports = router;
