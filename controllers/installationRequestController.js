const InstallationRequest = require("../models/InstallationRequest");
const mongoose = require("mongoose");

// @desc    Get all installation requests
// @route   GET /api/installation-requests
// @access  Private/Admin
exports.getInstallationRequests = async (req, res) => {
  try {
    const { status, search } = req.query;

    // Build query
    let query = {};

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Search by name, phone, or email
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const requests = await InstallationRequest.find(query).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (error) {
    console.error("Error fetching installation requests:", error);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Get single installation request
// @route   GET /api/installation-requests/:id
// @access  Private/Admin
exports.getInstallationRequest = async (req, res) => {
  try {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid request ID format",
      });
    }

    const request = await InstallationRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        error: "Installation request not found",
      });
    }

    res.status(200).json({
      success: true,
      data: request,
    });
  } catch (error) {
    console.error("Error fetching installation request:", error);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Create new installation request
// @route   POST /api/installation-requests
// @access  Public
exports.createInstallationRequest = async (req, res) => {
  try {
    const request = await InstallationRequest.create(req.body);

    res.status(201).json({
      success: true,
      data: request,
    });
  } catch (error) {
    console.error("Error creating installation request:", error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Update installation request
// @route   PUT /api/installation-requests/:id
// @access  Private/Admin
exports.updateInstallationRequest = async (req, res) => {
  try {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid request ID format",
      });
    }

    const request = await InstallationRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!request) {
      return res.status(404).json({
        success: false,
        error: "Installation request not found",
      });
    }

    res.status(200).json({
      success: true,
      data: request,
    });
  } catch (error) {
    console.error("Error updating installation request:", error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Delete installation request
// @route   DELETE /api/installation-requests/:id
// @access  Private/Admin
exports.deleteInstallationRequest = async (req, res) => {
  try {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid request ID format",
      });
    }

    const request = await InstallationRequest.findByIdAndDelete(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        error: "Installation request not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    console.error("Error deleting installation request:", error);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
