const express = require("express");

const router = express.Router();

const cartController = require("../controllers/cartController");

const authMiddleware = require("../middleware/authMiddleware");

/*
=========================================
Cart APIs
=========================================
*/

router.post("/", authMiddleware, cartController.addToCart);

router.get("/:warehouseId", authMiddleware, cartController.getCart);

router.put("/", authMiddleware, cartController.updateCart);

router.delete("/:productId", authMiddleware, cartController.removeCartItem);

router.delete("/clear/:warehouseId", authMiddleware, cartController.clearCart);

router.post("/place-order", authMiddleware, cartController.placeOrder);

module.exports = router;