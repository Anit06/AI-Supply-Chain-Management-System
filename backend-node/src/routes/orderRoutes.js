// const express = require("express");
// const router = express.Router();
// const authMiddleware = require("../middleware/authMiddleware");
// const orderController = require("../controllers/orderController");

// router.get("/mine", authMiddleware, orderController.getMyOrders);
// router.get("/:orderId", authMiddleware, orderController.getOrderById);

// module.exports = router;
const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  placeOrder,
  getOrderHistory,
  getOrder,
  updateStatus,
  deleteOrder
} = require("../controllers/orderController");

router.post("/place", auth, placeOrder);
router.get("/history", auth, getOrderHistory);
router.get("/:id", auth, getOrder);
router.put("/:id/status", auth, updateStatus);
router.delete("/:id", auth, deleteOrder);

module.exports = router;