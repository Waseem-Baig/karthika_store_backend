const Networking = require("../models/Networking");
const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = "uploads/networking";
    try {
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (error) {
      cb(error, uploadDir);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "networking-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"));
    }
  },
}).array("images", 5);

// Get all networking products with optional filters
exports.getNetworkingProducts = async (req, res) => {
  try {
    const { brand, category, inStock, minPrice, maxPrice } = req.query;
    let query = {};

    if (brand) {
      query.brand = brand;
    }

    if (category) {
      query.category = category;
    }

    if (inStock !== undefined) {
      query.inStock = inStock === "true";
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const networkingProducts = await Networking.find(query).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: networkingProducts.length,
      data: networkingProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Get single networking product by ID
exports.getNetworkingProductById = async (req, res) => {
  try {
    const networkingProduct = await Networking.findById(req.params.id);

    if (!networkingProduct) {
      return res.status(404).json({
        success: false,
        message: "Networking product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: networkingProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Create networking product
exports.createNetworkingProduct = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    try {
      const networkingData = {
        ...req.body,
        features: JSON.parse(req.body.features || "[]"),
        specifications: JSON.parse(req.body.specifications || "{}"),
        images: [],
      };

      // Handle existing images from URL
      if (req.body.images) {
        const existingImages = JSON.parse(req.body.images);
        networkingData.images = existingImages;
      }

      // Add newly uploaded images
      if (req.files && req.files.length > 0) {
        const newImages = req.files.map(
          (file) => `/${file.path.replace(/\\/g, "/")}`
        );
        networkingData.images = [...networkingData.images, ...newImages];
      }

      const networkingProduct = await Networking.create(networkingData);

      res.status(201).json({
        success: true,
        data: networkingProduct,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Failed to create networking product",
        error: error.message,
      });
    }
  });
};

// Update networking product
exports.updateNetworkingProduct = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    try {
      let networkingProduct = await Networking.findById(req.params.id);

      if (!networkingProduct) {
        return res.status(404).json({
          success: false,
          message: "Networking product not found",
        });
      }

      const updateData = {
        ...req.body,
        features: JSON.parse(req.body.features || "[]"),
        specifications: JSON.parse(req.body.specifications || "{}"),
      };

      // Handle images
      if (req.body.images) {
        updateData.images = JSON.parse(req.body.images);
      }

      // Add newly uploaded images
      if (req.files && req.files.length > 0) {
        const newImages = req.files.map(
          (file) => `/${file.path.replace(/\\/g, "/")}`
        );
        updateData.images = [...(updateData.images || []), ...newImages];
      }

      networkingProduct = await Networking.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );

      res.status(200).json({
        success: true,
        data: networkingProduct,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Failed to update networking product",
        error: error.message,
      });
    }
  });
};

// Delete networking product
exports.deleteNetworkingProduct = async (req, res) => {
  try {
    const networkingProduct = await Networking.findById(req.params.id);

    if (!networkingProduct) {
      return res.status(404).json({
        success: false,
        message: "Networking product not found",
      });
    }

    // Delete associated images
    if (networkingProduct.images && networkingProduct.images.length > 0) {
      for (const imagePath of networkingProduct.images) {
        try {
          const fullPath = path.join(
            __dirname,
            "..",
            imagePath.replace(/^\//, "")
          );
          await fs.unlink(fullPath);
        } catch (error) {
          console.error(`Failed to delete image: ${imagePath}`, error);
        }
      }
    }

    await Networking.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Networking product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Delete specific image from networking product
exports.deleteNetworkingImage = async (req, res) => {
  try {
    const { id, imageIndex } = req.params;

    const networkingProduct = await Networking.findById(id);

    if (!networkingProduct) {
      return res.status(404).json({
        success: false,
        message: "Networking product not found",
      });
    }

    const index = parseInt(imageIndex);
    if (index < 0 || index >= networkingProduct.images.length) {
      return res.status(400).json({
        success: false,
        message: "Invalid image index",
      });
    }

    const imagePath = networkingProduct.images[index];

    // Delete the file
    try {
      const fullPath = path.join(__dirname, "..", imagePath.replace(/^\//, ""));
      await fs.unlink(fullPath);
    } catch (error) {
      console.error(`Failed to delete image file: ${imagePath}`, error);
    }

    // Remove image from array
    networkingProduct.images.splice(index, 1);
    await networkingProduct.save();

    res.status(200).json({
      success: true,
      message: "Image deleted successfully",
      data: networkingProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
