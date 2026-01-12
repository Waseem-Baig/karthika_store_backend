const Download = require("../models/Download");
const path = require("path");
const fs = require("fs");

// @desc    Get all downloads
// @route   GET /api/downloads
// @access  Public
exports.getAllDownloads = async (req, res) => {
  try {
    const { category, isActive } = req.query;

    let query = {};

    if (category) {
      query.category = category;
    }

    if (isActive !== undefined) {
      query.isActive = isActive === "true";
    }

    const downloads = await Download.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: downloads.length,
      data: downloads,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching downloads",
      error: error.message,
    });
  }
};

// @desc    Get single download
// @route   GET /api/downloads/:id
// @access  Public
exports.getDownload = async (req, res) => {
  try {
    const download = await Download.findById(req.params.id);

    if (!download) {
      return res.status(404).json({
        success: false,
        message: "Download not found",
      });
    }

    res.status(200).json({
      success: true,
      data: download,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching download",
      error: error.message,
    });
  }
};

// @desc    Create download
// @route   POST /api/downloads
// @access  Private/Admin
exports.createDownload = async (req, res) => {
  try {
    const { name, description, category, fileSize, fileType } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a file",
      });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    const fileName = req.file.originalname;

    const download = await Download.create({
      name,
      description,
      category,
      fileUrl,
      fileName,
      fileSize: fileSize || `${(req.file.size / (1024 * 1024)).toFixed(2)} MB`,
      fileType: fileType || path.extname(req.file.originalname).substring(1),
    });

    res.status(201).json({
      success: true,
      data: download,
    });
  } catch (error) {
    // Delete uploaded file if database operation fails
    if (req.file) {
      const filePath = path.join(__dirname, "../uploads", req.file.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    res.status(500).json({
      success: false,
      message: "Error creating download",
      error: error.message,
    });
  }
};

// @desc    Update download
// @route   PUT /api/downloads/:id
// @access  Private/Admin
exports.updateDownload = async (req, res) => {
  try {
    let download = await Download.findById(req.params.id);

    if (!download) {
      return res.status(404).json({
        success: false,
        message: "Download not found",
      });
    }

    const updateData = {
      name: req.body.name || download.name,
      description: req.body.description || download.description,
      category: req.body.category || download.category,
      fileSize: req.body.fileSize || download.fileSize,
      fileType: req.body.fileType || download.fileType,
      isActive:
        req.body.isActive !== undefined ? req.body.isActive : download.isActive,
    };

    // If new file is uploaded, delete old file and update file info
    if (req.file) {
      // Delete old file
      const oldFilePath = path.join(__dirname, "..", download.fileUrl);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }

      updateData.fileUrl = `/uploads/${req.file.filename}`;
      updateData.fileName = req.file.originalname;
      updateData.fileSize =
        req.body.fileSize || `${(req.file.size / (1024 * 1024)).toFixed(2)} MB`;
      updateData.fileType =
        req.body.fileType || path.extname(req.file.originalname).substring(1);
    }

    download = await Download.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: download,
    });
  } catch (error) {
    // Delete uploaded file if database operation fails
    if (req.file) {
      const filePath = path.join(__dirname, "../uploads", req.file.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    res.status(500).json({
      success: false,
      message: "Error updating download",
      error: error.message,
    });
  }
};

// @desc    Delete download
// @route   DELETE /api/downloads/:id
// @access  Private/Admin
exports.deleteDownload = async (req, res) => {
  try {
    const download = await Download.findById(req.params.id);

    if (!download) {
      return res.status(404).json({
        success: false,
        message: "Download not found",
      });
    }

    // Delete file from filesystem
    const filePath = path.join(__dirname, "..", download.fileUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await Download.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Download deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting download",
      error: error.message,
    });
  }
};

// @desc    Increment download count
// @route   PUT /api/downloads/:id/increment
// @access  Public
exports.incrementDownloadCount = async (req, res) => {
  try {
    const download = await Download.findByIdAndUpdate(
      req.params.id,
      { $inc: { downloadCount: 1 } },
      { new: true }
    );

    if (!download) {
      return res.status(404).json({
        success: false,
        message: "Download not found",
      });
    }

    res.status(200).json({
      success: true,
      data: download,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating download count",
      error: error.message,
    });
  }
};
