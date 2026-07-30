const Payment = require("../models/Payment");
const razorpay = require("../config/razorpay");
const crypto = require("crypto");

/*
====================================
Create Razorpay Order
====================================
*/

exports.createOrder = async (amount) => {

    const options = {

        amount: amount * 100, // Convert ₹ to paise

        currency: "INR",

        receipt: `receipt_${Date.now()}`

    };

    const order = await razorpay.orders.create(options);

    return order;

};

/*
====================================
Verify Razorpay Payment
====================================
*/

exports.verifyPayment = async (data) => {

    const {

        razorpay_order_id,

        razorpay_payment_id,

        razorpay_signature

    } = data;

    const generatedSignature = crypto
        .createHmac(
            "sha256",
            process.env.RAZORPAY_KEY_SECRET
        )
        .update(
            razorpay_order_id + "|" + razorpay_payment_id
        )
        .digest("hex");

    return generatedSignature === razorpay_signature;

};

/*
====================================
Save Payment
====================================
*/

exports.savePayment = async (paymentData) => {

    const payment = new Payment({

        userId: paymentData.userId,

        orderId: paymentData.orderId,

        amount: paymentData.amount,

        paymentMethod: paymentData.paymentMethod,

        paymentStatus: paymentData.paymentStatus,

        razorpayOrderId:
            paymentData.razorpayOrderId || "",

        razorpayPaymentId:
            paymentData.razorpayPaymentId || "",

        razorpaySignature:
            paymentData.razorpaySignature || "",

        transactionId:
            paymentData.transactionId || ""

    });

    return await payment.save();

};

/*
====================================
Cash On Delivery
====================================
*/

exports.cashOnDelivery = async (paymentData) => {

    const payment = new Payment({

        userId: paymentData.userId,

        orderId: paymentData.orderId,

        amount: paymentData.amount,

        paymentMethod: "COD",

        paymentStatus: "Pending",

        transactionId:
            "COD-" + Date.now()

    });

    return await payment.save();

};

/*
====================================
Payment History
====================================
*/

exports.getPaymentHistory = async (userId) => {

    return await Payment.find({

        userId

    })
    .sort({

        createdAt: -1

    });

};