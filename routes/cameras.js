const express = require("express");
const {
  getCameras,
  getCamera,
  createCamera,
  updateCamera,
  deleteCamera,
} = require("../controllers/cameraController");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

// Public routes
router.get("/", getCameras);
router.get("/:id", getCamera);

// Protected routes (Admin only)
router.post("/", protect, authorize("admin"), createCamera);
router.put("/:id", protect, authorize("admin"), updateCamera);
router.delete("/:id", protect, authorize("admin"), deleteCamera);

module.exports = router;
