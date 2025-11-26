const express = require("express");
const router = express.Router();
const {
  getSystems,
  getSystem,
  createSystem,
  updateSystem,
  deleteSystem,
} = require("../controllers/systemController");

const { protect, authorize } = require("../middleware/auth");

// Public routes
router.get("/", getSystems);
router.get("/:id", getSystem);

// Protected routes (admin only)
router.post("/", protect, authorize("admin"), createSystem);
router.put("/:id", protect, authorize("admin"), updateSystem);
router.delete("/:id", protect, authorize("admin"), deleteSystem);

module.exports = router;
