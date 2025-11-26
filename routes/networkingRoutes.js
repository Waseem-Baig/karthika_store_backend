const express = require("express");
const router = express.Router();
const {
  getNetworkingProducts,
  getNetworkingProductById,
  createNetworkingProduct,
  updateNetworkingProduct,
  deleteNetworkingProduct,
  deleteNetworkingImage,
} = require("../controllers/networkingController");
const { protect, authorize } = require("../middleware/auth");

// Public routes
router.get("/", getNetworkingProducts);
router.get("/:id", getNetworkingProductById);

// Protected routes (admin only)
router.post("/", protect, authorize("admin"), createNetworkingProduct);
router.put("/:id", protect, authorize("admin"), updateNetworkingProduct);
router.delete("/:id", protect, authorize("admin"), deleteNetworkingProduct);
router.delete(
  "/:id/images/:imageIndex",
  protect,
  authorize("admin"),
  deleteNetworkingImage
);

module.exports = router;
