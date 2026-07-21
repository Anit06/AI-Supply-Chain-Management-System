const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const orderController = require("../controllers/orderController");

router.get("/mine", authMiddleware, orderController.getMyOrders);
router.get("/:orderId", authMiddleware, orderController.getOrderById);

module.exports = router;
