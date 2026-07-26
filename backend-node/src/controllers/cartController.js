const cartService = require("../services/cartService");

const addToCart = async (req, res) => {
    try {
        const cart = await cartService.addItemToCart({
            userId: req.user.id,
            warehouseId: req.body.warehouseId,
            productId: req.body.productId,
            productName: req.body.productName,
            price: req.body.price,
            quantity: req.body.quantity,
            unit: req.body.unit
        });

        return res.status(200).json({ success: true, cart });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

const getCart = async (req, res) => {
    try {
        const cart = await cartService.getCart({ userId: req.user.id, warehouseId: req.params.warehouseId });
        return res.status(200).json({ success: true, cart });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

const updateCart = async (req, res) => {
    try {
        const cart = await cartService.updateCartItemQuantity({
            userId: req.user.id,
            warehouseId: req.body.warehouseId,
            productId: req.body.productId,
            quantity: req.body.quantity
        });

        return res.status(200).json({ success: true, cart });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

const removeCartItem = async (req, res) => {
    try {
        const cart = await cartService.removeCartItem({ userId: req.user.id, warehouseId: req.body.warehouseId, productId: req.params.itemId });
        return res.status(200).json({ success: true, cart });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

const clearCart = async (req, res) => {
    try {
        const cart = await cartService.clearCart({ userId: req.user.id, warehouseId: req.params.warehouseId });
        return res.status(200).json({ success: true, cart });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

const placeOrder = async (req, res) => {
    try {
        const order = await cartService.placeOrder({ userId: req.user.id, warehouseId: req.body.warehouseId });
        return res.status(200).json({ success: true, order });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = {
    addToCart,
    getCart,
    updateCart,
    removeCartItem,
    clearCart,
    placeOrder
};
