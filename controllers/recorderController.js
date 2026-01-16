const Recorder = require("../models/Recorder");
const mongoose = require("mongoose");

// @desc    Get all recorders
// @route   GET /api/recorders
// @access  Public
exports.getRecorders = async (req, res) => {
  try {
    const { brand, category, minPrice, maxPrice, inStock, sort } = req.query;

    // Build query
    let query = {};

    if (brand) {
      query.brand = brand;
    }

    if (category) {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (inStock !== undefined) {
      query.inStock = inStock === "true";
    }

    if (channels) {
      query.channels = Number(channels);
    }

    // Build sort
    let sortOption = {};
    if (sort) {
      switch (sort) {
        case "price_asc":
          sortOption.price = 1;
          break;
        case "price_desc":
          sortOption.price = -1;
          break;
        case "name":
          sortOption.name = 1;
          break;
        case "newest":
          sortOption.createdAt = -1;
          break;
        default:
          sortOption.createdAt = -1;
      }
    } else {
      sortOption.createdAt = -1;
    }

    const recorders = await Recorder.find(query).sort(sortOption);

    res.status(200).json({
      success: true,
      count: recorders.length,
      data: recorders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Get single recorder
// @route   GET /api/recorders/:id
// @access  Public
exports.getRecorder = async (req, res) => {
  try {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid recorder ID",
      });
    }

    const recorder = await Recorder.findById(req.params.id);

    if (!recorder) {
      return res.status(404).json({
        success: false,
        error: "Recorder not found",
      });
    }

    res.status(200).json({
      success: true,
      data: recorder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Create recorder
// @route   POST /api/recorders
// @access  Private/Admin
exports.createRecorder = async (req, res) => {
  try {
    const recorder = await Recorder.create(req.body);

    res.status(201).json({
      success: true,
      data: recorder,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Update recorder
// @route   PUT /api/recorders/:id
// @access  Private/Admin
exports.updateRecorder = async (req, res) => {
  try {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid recorder ID",
      });
    }

    const recorder = await Recorder.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!recorder) {
      return res.status(404).json({
        success: false,
        error: "Recorder not found",
      });
    }

    res.status(200).json({
      success: true,
      data: recorder,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Delete recorder
// @route   DELETE /api/recorders/:id
// @access  Private/Admin
exports.deleteRecorder = async (req, res) => {
  try {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid recorder ID",
      });
    }

    const recorder = await Recorder.findByIdAndDelete(req.params.id);

    if (!recorder) {
      return res.status(404).json({
        success: false,
        error: "Recorder not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
