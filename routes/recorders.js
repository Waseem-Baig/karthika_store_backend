const express = require("express");
const router = express.Router();
const {
  getRecorders,
  getRecorder,
  createRecorder,
  updateRecorder,
  deleteRecorder,
} = require("../controllers/recorderController");

const { protect, authorize } = require("../middleware/auth");

// Public routes
router.get("/", getRecorders);
router.get("/:id", getRecorder);

// Protected routes (admin only)
router.post("/", protect, authorize("admin"), createRecorder);
router.put("/:id", protect, authorize("admin"), updateRecorder);
router.delete("/:id", protect, authorize("admin"), deleteRecorder);

module.exports = router;
