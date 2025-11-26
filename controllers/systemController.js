const System = require("../models/System");
const mongoose = require("mongoose");

// @desc    Get all systems
// @route   GET /api/systems
// @access  Public
exports.getSystems = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, inStock, sort, cameras } = req.query;

    // Build query
    let query = {};

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

    if (cameras) {
      query.cameras = Number(cameras);
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

    const systems = await System.find(query).sort(sortOption);

    res.status(200).json({
      success: true,
      count: systems.length,
      data: systems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Get single system
// @route   GET /api/systems/:id
// @access  Public
exports.getSystem = async (req, res) => {
  try {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid system ID",
      });
    }

    const system = await System.findById(req.params.id);

    if (!system) {
      return res.status(404).json({
        success: false,
        error: "System not found",
      });
    }

    res.status(200).json({
      success: true,
      data: system,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Create system
// @route   POST /api/systems
// @access  Private/Admin
exports.createSystem = async (req, res) => {
  try {
    const system = await System.create(req.body);

    res.status(201).json({
      success: true,
      data: system,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Update system
// @route   PUT /api/systems/:id
// @access  Private/Admin
exports.updateSystem = async (req, res) => {
  try {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid system ID",
      });
    }

    const system = await System.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!system) {
      return res.status(404).json({
        success: false,
        error: "System not found",
      });
    }

    res.status(200).json({
      success: true,
      data: system,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Delete system
// @route   DELETE /api/systems/:id
// @access  Private/Admin
exports.deleteSystem = async (req, res) => {
  try {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid system ID",
      });
    }

    const system = await System.findByIdAndDelete(req.params.id);

    if (!system) {
      return res.status(404).json({
        success: false,
        error: "System not found",
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
