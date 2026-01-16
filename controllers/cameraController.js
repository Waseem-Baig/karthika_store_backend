const Camera = require("../models/Camera");

// @desc    Get all cameras
// @route   GET /api/cameras
// @access  Public
exports.getCameras = async (req, res) => {
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

    if (inStock === "true") {
      query.inStock = true;
    }

    // Execute query
    let cameras = Camera.find(query);

    // Sorting
    if (sort) {
      const sortBy = sort.split(",").join(" ");
      cameras = cameras.sort(sortBy);
    } else {
      cameras = cameras.sort("-createdAt");
    }

    const result = await cameras;

    res.status(200).json({
      success: true,
      count: result.length,
      data: result,
    });
  } catch (error) {
    console.error("Error fetching cameras:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching cameras",
      error: error.message,
    });
  }
};

// @desc    Get single camera
// @route   GET /api/cameras/:id
// @access  Public
exports.getCamera = async (req, res) => {
  try {
    const camera = await Camera.findById(req.params.id);

    if (!camera) {
      return res.status(404).json({
        success: false,
        message: "Camera not found",
      });
    }

    res.status(200).json({
      success: true,
      data: camera,
    });
  } catch (error) {
    console.error("Error fetching camera:", error);

    // Handle invalid ObjectId
    if (error.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        message: "Camera not found",
      });
    }

    res.status(500).json({
      success: false,
      message: "Error fetching camera",
      error: error.message,
    });
  }
};

// @desc    Create new camera
// @route   POST /api/cameras
// @access  Private/Admin
exports.createCamera = async (req, res) => {
  try {
    const camera = await Camera.create(req.body);

    res.status(201).json({
      success: true,
      data: camera,
    });
  } catch (error) {
    console.error("Error creating camera:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: messages,
      });
    }

    res.status(500).json({
      success: false,
      message: "Error creating camera",
      error: error.message,
    });
  }
};

// @desc    Update camera
// @route   PUT /api/cameras/:id
// @access  Private/Admin
exports.updateCamera = async (req, res) => {
  try {
    const camera = await Camera.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!camera) {
      return res.status(404).json({
        success: false,
        message: "Camera not found",
      });
    }

    res.status(200).json({
      success: true,
      data: camera,
    });
  } catch (error) {
    console.error("Error updating camera:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: messages,
      });
    }

    // Handle invalid ObjectId
    if (error.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        message: "Camera not found",
      });
    }

    res.status(500).json({
      success: false,
      message: "Error updating camera",
      error: error.message,
    });
  }
};

// @desc    Delete camera
// @route   DELETE /api/cameras/:id
// @access  Private/Admin
exports.deleteCamera = async (req, res) => {
  try {
    const camera = await Camera.findById(req.params.id);

    if (!camera) {
      return res.status(404).json({
        success: false,
        message: "Camera not found",
      });
    }

    await camera.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
      message: "Camera deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting camera:", error);

    // Handle invalid ObjectId
    if (error.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        message: "Camera not found",
      });
    }

    res.status(500).json({
      success: false,
      message: "Error deleting camera",
      error: error.message,
    });
  }
};
