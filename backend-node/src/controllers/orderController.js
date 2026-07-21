const Order = require("../models/Order");

const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
        return res.status(200).json({ success: true, orders });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await Order.findOne({ _id: req.params.orderId, userId: req.user.id });
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        return res.status(200).json({ success: true, order });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = { getMyOrders, getOrderById };
