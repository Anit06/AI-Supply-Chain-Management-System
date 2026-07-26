const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const cartController = require("../controllers/cartController");

router.post("/add", authMiddleware, cartController.addToCart);
router.get("/:warehouseId", authMiddleware, cartController.getCart);
router.put("/update", authMiddleware, cartController.updateCart);
router.delete("/item/:itemId", authMiddleware, cartController.removeCartItem);
router.delete("/clear/:warehouseId", authMiddleware, cartController.clearCart);
router.post("/place-order", authMiddleware, cartController.placeOrder);

module.exports = router;
