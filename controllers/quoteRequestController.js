const QuoteRequest = require("../models/QuoteRequest");
const mongoose = require("mongoose");

// @desc    Get all quote requests
// @route   GET /api/quote-requests
// @access  Private/Admin
exports.getQuoteRequests = async (req, res) => {
  try {
    const { status, search } = req.query;

    // Build query
    let query = {};

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Search by name, phone, email, or city
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
      ];
    }

    const requests = await QuoteRequest.find(query).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (error) {
    console.error("Error fetching quote requests:", error);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Get single quote request
// @route   GET /api/quote-requests/:id
// @access  Private/Admin
exports.getQuoteRequest = async (req, res) => {
  try {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid request ID format",
      });
    }

    const request = await QuoteRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        error: "Quote request not found",
      });
    }

    res.status(200).json({
      success: true,
      data: request,
    });
  } catch (error) {
    console.error("Error fetching quote request:", error);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Create new quote request
// @route   POST /api/quote-requests
// @access  Public
exports.createQuoteRequest = async (req, res) => {
  try {
    const request = await QuoteRequest.create(req.body);

    res.status(201).json({
      success: true,
      data: request,
    });
  } catch (error) {
    console.error("Error creating quote request:", error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Update quote request
// @route   PUT /api/quote-requests/:id
// @access  Private/Admin
exports.updateQuoteRequest = async (req, res) => {
  try {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid request ID format",
      });
    }

    const request = await QuoteRequest.findByIdAndUpdate(
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
        error: "Quote request not found",
      });
    }

    res.status(200).json({
      success: true,
      data: request,
    });
  } catch (error) {
    console.error("Error updating quote request:", error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Delete quote request
// @route   DELETE /api/quote-requests/:id
// @access  Private/Admin
exports.deleteQuoteRequest = async (req, res) => {
  try {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid request ID format",
      });
    }

    const request = await QuoteRequest.findByIdAndDelete(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        error: "Quote request not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    console.error("Error deleting quote request:", error);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
