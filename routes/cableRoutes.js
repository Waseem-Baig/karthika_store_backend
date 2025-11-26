const express = require("express");
const router = express.Router();
const {
  getCables,
  getCableById,
  createCable,
  updateCable,
  deleteCable,
  deleteCableImage,
  upload,
} = require("../controllers/cableController");
const { protect, authorize } = require("../middleware/auth");

// Public routes
router.get("/", getCables);
router.get("/:id", getCableById);

// Protected admin routes
router.post(
  "/",
  protect,
  authorize("admin"),
  upload.array("images", 5),
  createCable
);
router.put(
  "/:id",
  protect,
  authorize("admin"),
  upload.array("images", 5),
  updateCable
);
router.delete("/:id", protect, authorize("admin"), deleteCable);
router.delete("/:id/images", protect, authorize("admin"), deleteCableImage);

module.exports = router;
