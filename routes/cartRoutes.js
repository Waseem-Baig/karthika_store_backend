const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// All routes are accessible without authentication (using sessionId for guests)
router.get("/", cartController.getCart);
router.post("/add", cartController.addToCart);
router.delete("/remove/:productId", cartController.removeFromCart);
router.put("/update/:productId", cartController.updateQuantity);
router.delete("/clear", cartController.clearCart);

module.exports = router;
