const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/paymentController");

// Replace this with your project's authentication middleware
const authMiddleware = require("../middleware/authMiddleware");

/*
=====================================
Create Razorpay Order
POST /api/payment/create-order
=====================================
*/
router.post(
    "/create-order",
    authMiddleware,
    paymentController.createOrder
);

/*
=====================================
Verify Razorpay Payment
POST /api/payment/verify
=====================================
*/
router.post(
    "/verify",
    authMiddleware,
    paymentController.verifyPayment
);

/*
=====================================
Cash On Delivery
POST /api/payment/cod
=====================================
*/
router.post(
    "/cod",
    authMiddleware,
    paymentController.cashOnDelivery
);

/*
=====================================
Save Payment
POST /api/payment/save-payment
=====================================
*/
router.post(
    "/save-payment",
    authMiddleware,
    paymentController.savePayment
);

/*
=====================================
Payment History
GET /api/payment/history
=====================================
*/
router.get(
    "/history",
    authMiddleware,
    paymentController.getPaymentHistory
);

module.exports = router;