const express = require("express");
const router = express.Router();
const {
  getStorageProducts,
  getStorageProductById,
  createStorageProduct,
  updateStorageProduct,
  deleteStorageProduct,
  deleteStorageImage,
} = require("../controllers/storageController");
const { protect, authorize } = require("../middleware/auth");

// Public routes
router.get("/", getStorageProducts);
router.get("/:id", getStorageProductById);

// Protected routes (admin only)
router.post("/", protect, authorize("admin"), createStorageProduct);
router.put("/:id", protect, authorize("admin"), updateStorageProduct);
router.delete("/:id", protect, authorize("admin"), deleteStorageProduct);
router.delete(
  "/:id/images/:imageIndex",
  protect,
  authorize("admin"),
  deleteStorageImage
);

module.exports = router;
