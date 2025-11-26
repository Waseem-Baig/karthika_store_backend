const express = require("express");
const router = express.Router();
const {
  getQuoteRequests,
  getQuoteRequest,
  createQuoteRequest,
  updateQuoteRequest,
  deleteQuoteRequest,
} = require("../controllers/quoteRequestController");

const { protect, authorize } = require("../middleware/auth");

// Public route
router.post("/", createQuoteRequest);

// Admin routes
router.get("/", protect, authorize("admin"), getQuoteRequests);
router.get("/:id", protect, authorize("admin"), getQuoteRequest);
router.put("/:id", protect, authorize("admin"), updateQuoteRequest);
router.delete("/:id", protect, authorize("admin"), deleteQuoteRequest);

module.exports = router;
