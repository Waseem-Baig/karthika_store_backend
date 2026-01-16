const Cable = require("../models/Cable");
const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../uploads/cables");
    try {
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (error) {
      cb(error, null);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "cable-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Only image files are allowed!"));
  },
});

// @desc    Get all cables
// @route   GET /api/cables
// @access  Public
const getCables = async (req, res) => {
  try {
    const { brand, minPrice, maxPrice, inStock, search } = req.query;

    let query = {};

    // Filter by brand
    if (brand) {
      query.brand = brand;
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Filter by stock status
    if (inStock === "true") {
      query.inStock = true;
    }

    // Search by name or description
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const cables = await Cable.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: cables.length,
      data: cables,
    });
  } catch (error) {
    console.error("Error fetching cables:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// @desc    Get single cable
// @route   GET /api/cables/:id
// @access  Public
const getCableById = async (req, res) => {
  try {
    const cable = await Cable.findById(req.params.id);

    if (!cable) {
      return res.status(404).json({
        success: false,
        message: "Cable not found",
      });
    }

    res.json({
      success: true,
      data: cable,
    });
  } catch (error) {
    console.error("Error fetching cable:", error);

    if (error.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        message: "Cable not found",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// @desc    Create new cable
// @route   POST /api/cables
// @access  Private/Admin
const createCable = async (req, res) => {
  try {
    const cableData = { ...req.body };

    // Handle uploaded images
    if (req.files && req.files.length > 0) {
      cableData.images = req.files.map(
        (file) => `/uploads/cables/${file.filename}`
      );
    }

    // Parse features if sent as string
    if (typeof cableData.features === "string") {
      cableData.features = JSON.parse(cableData.features);
    }

    // Parse specifications if sent as string
    if (typeof cableData.specifications === "string") {
      cableData.specifications = JSON.parse(cableData.specifications);
    }

    const cable = await Cable.create(cableData);

    res.status(201).json({
      success: true,
      data: cable,
    });
  } catch (error) {
    console.error("Error creating cable:", error);
    res.status(400).json({
      success: false,
      message: "Failed to create cable",
      error: error.message,
    });
  }
};

// @desc    Update cable
// @route   PUT /api/cables/:id
// @access  Private/Admin
const updateCable = async (req, res) => {
  try {
    let cable = await Cable.findById(req.params.id);

    if (!cable) {
      return res.status(404).json({
        success: false,
        message: "Cable not found",
      });
    }

    const updateData = { ...req.body };

    // Handle new uploaded images
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(
        (file) => `/uploads/cables/${file.filename}`
      );
      updateData.images = cable.images
        ? [...cable.images, ...newImages]
        : newImages;
    }

    // Parse features if sent as string
    if (typeof updateData.features === "string") {
      updateData.features = JSON.parse(updateData.features);
    }

    // Parse specifications if sent as string
    if (typeof updateData.specifications === "string") {
      updateData.specifications = JSON.parse(updateData.specifications);
    }

    cable = await Cable.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      data: cable,
    });
  } catch (error) {
    console.error("Error updating cable:", error);
    res.status(400).json({
      success: false,
      message: "Failed to update cable",
      error: error.message,
    });
  }
};

// @desc    Delete cable
// @route   DELETE /api/cables/:id
// @access  Private/Admin
const deleteCable = async (req, res) => {
  try {
    const cable = await Cable.findById(req.params.id);

    if (!cable) {
      return res.status(404).json({
        success: false,
        message: "Cable not found",
      });
    }

    // Delete associated images
    if (cable.images && cable.images.length > 0) {
      for (const imagePath of cable.images) {
        try {
          const fullPath = path.join(__dirname, "..", imagePath);
          await fs.unlink(fullPath);
        } catch (err) {
          console.error("Error deleting image:", err);
        }
      }
    }

    await cable.deleteOne();

    res.json({
      success: true,
      message: "Cable deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting cable:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// @desc    Delete cable image
// @route   DELETE /api/cables/:id/images
// @access  Private/Admin
const deleteCableImage = async (req, res) => {
  try {
    const { imageUrl } = req.body;
    const cable = await Cable.findById(req.params.id);

    if (!cable) {
      return res.status(404).json({
        success: false,
        message: "Cable not found",
      });
    }

    // Remove image from array
    cable.images = cable.images.filter((img) => img !== imageUrl);
    await cable.save();

    // Delete physical file
    try {
      const fullPath = path.join(__dirname, "..", imageUrl);
      await fs.unlink(fullPath);
    } catch (err) {
      console.error("Error deleting image file:", err);
    }

    res.json({
      success: true,
      data: cable,
    });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  getCables,
  getCableById,
  createCable,
  updateCable,
  deleteCable,
  deleteCableImage,
  upload,
};
