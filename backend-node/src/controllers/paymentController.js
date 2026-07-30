const paymentService = require("../services/paymentService");

/*
==========================================
Create Razorpay Order
==========================================
*/

exports.createOrder = async (req, res) => {

    try {

        const { amount } = req.body;

        const order = await paymentService.createOrder(amount);

        return res.status(200).json({

            success: true,

            message: "Order Created Successfully",

            order

        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


/*
==========================================
Verify Razorpay Payment
==========================================
*/

exports.verifyPayment = async (req, res) => {

    try {

        const verified = await paymentService.verifyPayment(req.body);

        if (!verified) {

            return res.status(400).json({

                success: false,

                message: "Payment Verification Failed"

            });

        }

        await paymentService.savePayment({

            userId: req.user.id,

            orderId: req.body.orderId,

            amount: req.body.amount,

            paymentMethod: "Razorpay",

            paymentStatus: "Success",

            razorpayOrderId: req.body.razorpay_order_id,

            razorpayPaymentId: req.body.razorpay_payment_id,

            razorpaySignature: req.body.razorpay_signature,

            transactionId: req.body.razorpay_payment_id

        });

        return res.status(200).json({

            success: true,

            message: "Payment Successful"

        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


/*
==========================================
Cash On Delivery
==========================================
*/

exports.cashOnDelivery = async (req, res) => {

    try {

        await paymentService.cashOnDelivery({

            userId: req.user.id,

            orderId: req.body.orderId,

            amount: req.body.amount

        });

        return res.status(200).json({

            success: true,

            message: "Cash On Delivery Selected"

        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


/*
==========================================
Save Payment
==========================================
*/

exports.savePayment = async (req, res) => {

    try {

        const payment = await paymentService.savePayment(req.body);

        return res.status(201).json({

            success: true,

            payment

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


/*
==========================================
Payment History
==========================================
*/

exports.getPaymentHistory = async (req, res) => {

    try {

        const payments = await paymentService.getPaymentHistory(req.user.id);

        return res.status(200).json({

            success: true,

            payments

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};