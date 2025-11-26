const Solution = require("../models/Solution");
const mongoose = require("mongoose");

// @desc    Get all solutions
// @route   GET /api/solutions
// @access  Public
exports.getSolutions = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, search } = req.query;

    // Build query
    let query = {};

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Search by name or description
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { targetAudience: { $regex: search, $options: "i" } },
      ];
    }

    const solutions = await Solution.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: solutions.length,
      data: solutions,
    });
  } catch (error) {
    console.error("Error fetching solutions:", error);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Get single solution
// @route   GET /api/solutions/:id
// @access  Public
exports.getSolution = async (req, res) => {
  try {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid solution ID format",
      });
    }

    const solution = await Solution.findById(req.params.id);

    if (!solution) {
      return res.status(404).json({
        success: false,
        error: "Solution not found",
      });
    }

    res.status(200).json({
      success: true,
      data: solution,
    });
  } catch (error) {
    console.error("Error fetching solution:", error);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Create new solution
// @route   POST /api/solutions
// @access  Private/Admin
exports.createSolution = async (req, res) => {
  try {
    const solution = await Solution.create(req.body);

    res.status(201).json({
      success: true,
      data: solution,
    });
  } catch (error) {
    console.error("Error creating solution:", error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Update solution
// @route   PUT /api/solutions/:id
// @access  Private/Admin
exports.updateSolution = async (req, res) => {
  try {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid solution ID format",
      });
    }

    const solution = await Solution.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!solution) {
      return res.status(404).json({
        success: false,
        error: "Solution not found",
      });
    }

    res.status(200).json({
      success: true,
      data: solution,
    });
  } catch (error) {
    console.error("Error updating solution:", error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Delete solution
// @route   DELETE /api/solutions/:id
// @access  Private/Admin
exports.deleteSolution = async (req, res) => {
  try {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid solution ID format",
      });
    }

    const solution = await Solution.findByIdAndDelete(req.params.id);

    if (!solution) {
      return res.status(404).json({
        success: false,
        error: "Solution not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    console.error("Error deleting solution:", error);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
