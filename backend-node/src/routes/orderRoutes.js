const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const orderController = require("../controllers/orderController");

/*
==================================
SHOPKEEPER
==================================
*/

router.get(
    "/",
    authMiddleware,
    orderController.getOrders
);

/*
==================================
ADMIN GET ALL ORDERS
==================================
*/

router.get(
    "/admin",
    authMiddleware,
    roleMiddleware("admin"),
    orderController.getAllOrders
);

/*
==================================
ORDER ANALYTICS
==================================
*/

router.get(
    "/admin/analytics",
    authMiddleware,
    roleMiddleware("admin"),
    orderController.analytics
);

/*
==================================
ADMIN ORDER DETAILS
==================================
*/

router.get(
    "/admin/:id",
    authMiddleware,
    roleMiddleware("admin"),
    orderController.getAdminOrder
);

/*
==================================
UPDATE STATUS
==================================
*/

router.put(
    "/:id/status",
    authMiddleware,
    roleMiddleware("admin"),
    orderController.updateStatus
);

/*
==================================
SHOPKEEPER ORDER DETAILS
==================================
*/

router.get(
    "/:id",
    authMiddleware,
    orderController.getOrder
);

module.exports = router;