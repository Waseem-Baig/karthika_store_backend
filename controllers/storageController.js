const Storage = require("../models/Storage");
const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = "uploads/storage";
    try {
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (error) {
      cb(error, uploadDir);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "storage-" + uniqueSuffix + path.extname(file.originalname));
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

// Get all storage products with optional filters
exports.getStorageProducts = async (req, res) => {
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

    const storageProducts = await Storage.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: storageProducts.length,
      data: storageProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Get single storage product by ID
exports.getStorageProductById = async (req, res) => {
  try {
    const storageProduct = await Storage.findById(req.params.id);

    if (!storageProduct) {
      return res.status(404).json({
        success: false,
        message: "Storage product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: storageProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Create storage product
exports.createStorageProduct = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    try {
      const storageData = {
        ...req.body,
        features: JSON.parse(req.body.features || "[]"),
        specifications: JSON.parse(req.body.specifications || "{}"),
        images: [],
      };

      // Handle existing images from URL
      if (req.body.images) {
        const existingImages = JSON.parse(req.body.images);
        storageData.images = existingImages;
      }

      // Add newly uploaded images
      if (req.files && req.files.length > 0) {
        const newImages = req.files.map(
          (file) => `/${file.path.replace(/\\/g, "/")}`
        );
        storageData.images = [...storageData.images, ...newImages];
      }

      const storageProduct = await Storage.create(storageData);

      res.status(201).json({
        success: true,
        data: storageProduct,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Failed to create storage product",
        error: error.message,
      });
    }
  });
};

// Update storage product
exports.updateStorageProduct = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    try {
      let storageProduct = await Storage.findById(req.params.id);

      if (!storageProduct) {
        return res.status(404).json({
          success: false,
          message: "Storage product not found",
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

      storageProduct = await Storage.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );

      res.status(200).json({
        success: true,
        data: storageProduct,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Failed to update storage product",
        error: error.message,
      });
    }
  });
};

// Delete storage product
exports.deleteStorageProduct = async (req, res) => {
  try {
    const storageProduct = await Storage.findById(req.params.id);

    if (!storageProduct) {
      return res.status(404).json({
        success: false,
        message: "Storage product not found",
      });
    }

    // Delete associated images
    if (storageProduct.images && storageProduct.images.length > 0) {
      for (const imagePath of storageProduct.images) {
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

    await Storage.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Storage product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Delete specific image from storage product
exports.deleteStorageImage = async (req, res) => {
  try {
    const { id, imageIndex } = req.params;

    const storageProduct = await Storage.findById(id);

    if (!storageProduct) {
      return res.status(404).json({
        success: false,
        message: "Storage product not found",
      });
    }

    const index = parseInt(imageIndex);
    if (index < 0 || index >= storageProduct.images.length) {
      return res.status(400).json({
        success: false,
        message: "Invalid image index",
      });
    }

    const imagePath = storageProduct.images[index];

    // Delete the file
    try {
      const fullPath = path.join(__dirname, "..", imagePath.replace(/^\//, ""));
      await fs.unlink(fullPath);
    } catch (error) {
      console.error(`Failed to delete image file: ${imagePath}`, error);
    }

    // Remove image from array
    storageProduct.images.splice(index, 1);
    await storageProduct.save();

    res.status(200).json({
      success: true,
      message: "Image deleted successfully",
      data: storageProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
