const express = require("express");
const router = express.Router();
const {
  getSolutions,
  getSolution,
  createSolution,
  updateSolution,
  deleteSolution,
} = require("../controllers/solutionController");

const { protect, authorize } = require("../middleware/auth");

// Public routes
router.get("/", getSolutions);
router.get("/:id", getSolution);

// Admin routes
router.post("/", protect, authorize("admin"), createSolution);
router.put("/:id", protect, authorize("admin"), updateSolution);
router.delete("/:id", protect, authorize("admin"), deleteSolution);

module.exports = router;
