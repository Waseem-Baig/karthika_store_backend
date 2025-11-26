const express = require("express");
const router = express.Router();
const {
  getInstallationRequests,
  getInstallationRequest,
  createInstallationRequest,
  updateInstallationRequest,
  deleteInstallationRequest,
} = require("../controllers/installationRequestController");

const { protect, authorize } = require("../middleware/auth");

// Public route
router.post("/", createInstallationRequest);

// Admin routes
router.get("/", protect, authorize("admin"), getInstallationRequests);
router.get("/:id", protect, authorize("admin"), getInstallationRequest);
router.put("/:id", protect, authorize("admin"), updateInstallationRequest);
router.delete("/:id", protect, authorize("admin"), deleteInstallationRequest);

module.exports = router;
