const Cart = require("../models/Cart");
const Inventory = require("../models/Inventory");
const Order = require("../models/Order");
const Product = require("../models/Product");
const ProductPrice = require("../models/ProductPrice");

const validateCartItemQuantity = (quantity, stock) => {
    if (quantity <= 0) {
        return { valid: false, message: "Quantity must be at least 1." };
    }

    if (quantity > stock) {
        return { valid: false, message: `Only ${stock} units available in stock.` };
    }

    return { valid: true };
};

const calculateCartTotals = (items) => {
    const cartTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return { cartTotal };
};

const getOrCreateCart = async (userId, warehouseId) => {
    let cart = await Cart.findOne({ userId, warehouseId, status: "Active" });

    if (!cart) {
        cart = await Cart.create({ userId, warehouseId, items: [], cartTotal: 0, status: "Active" });
    }

    return cart;
};

const addItemToCart = async ({ userId, warehouseId, productId, productName, price, quantity, unit }) => {
    const cart = await getOrCreateCart(userId, warehouseId);

    const inventory = await Inventory.findOne({ warehouse: warehouseId, product: productId }).populate("product");

    if (!inventory) {
        throw new Error("Inventory not found for selected warehouse");
    }

    const validation = validateCartItemQuantity(quantity, inventory.stock);
    if (!validation.valid) {
        throw new Error(validation.message);
    }

    const existingItem = cart.items.find((item) => item.productId.toString() === productId.toString());

    if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        const stockValidation = validateCartItemQuantity(newQuantity, inventory.stock);
        if (!stockValidation.valid) {
            throw new Error(stockValidation.message);
        }
        existingItem.quantity = newQuantity;
        existingItem.subtotal = existingItem.quantity * existingItem.price;
    } else {
        cart.items.push({
            productId,
            productName,
            price,
            quantity,
            unit,
            subtotal: quantity * price
        });
    }

    const totals = calculateCartTotals(cart.items);
    cart.cartTotal = totals.cartTotal;
    await cart.save();

    return cart;
};

const updateCartItemQuantity = async ({ userId, warehouseId, productId, quantity }) => {
    const cart = await getOrCreateCart(userId, warehouseId);
    const item = cart.items.find((entry) => entry.productId.toString() === productId.toString());

    if (!item) {
        throw new Error("Cart item not found");
    }

    const inventory = await Inventory.findOne({ warehouse: warehouseId, product: productId });
    if (!inventory) {
        throw new Error("Inventory not found");
    }

    const validation = validateCartItemQuantity(quantity, inventory.stock);
    if (!validation.valid) {
        throw new Error(validation.message);
    }

    item.quantity = quantity;
    item.subtotal = item.price * item.quantity;

    const totals = calculateCartTotals(cart.items);
    cart.cartTotal = totals.cartTotal;
    await cart.save();

    return cart;
};

const removeCartItem = async ({ userId, warehouseId, productId }) => {
    const cart = await getOrCreateCart(userId, warehouseId);
    cart.items = cart.items.filter((item) => item.productId.toString() !== productId.toString());

    const totals = calculateCartTotals(cart.items);
    cart.cartTotal = totals.cartTotal;
    await cart.save();

    return cart;
};

const clearCart = async ({ userId, warehouseId }) => {
    const cart = await getOrCreateCart(userId, warehouseId);
    cart.items = [];
    cart.cartTotal = 0;
    cart.status = "Abandoned";
    await cart.save();
    return cart;
};

const getCart = async ({ userId, warehouseId }) => {
    const cart = await Cart.findOne({ userId, warehouseId, status: "Active" }).populate({ path: "items.productId", model: Product });
    if (!cart) {
        return { items: [], cartTotal: 0, status: "Active" };
    }
    return cart;
};

const placeOrder = async ({ userId, warehouseId }) => {
    const cart = await Cart.findOne({ userId, warehouseId, status: "Active" }).populate({ path: "items.productId", model: Product });

    if (!cart || cart.items.length === 0) {
        throw new Error("Cart is empty");
    }

    const orderItems = cart.items.map((item) => ({
        productId: item.productId._id || item.productId,
        productName: item.productName,
        price: item.price,
        quantity: item.quantity,
        unit: item.unit,
        subtotal: item.subtotal
    }));

    const order = await Order.create({
        userId,
        warehouseId,
        items: orderItems,
        grandTotal: cart.cartTotal,
        status: "Pending"
    });

    for (const item of cart.items) {
        const inventory = await Inventory.findOne({ warehouse: warehouseId, product: item.productId._id || item.productId });
        if (inventory) {
            inventory.stock = Math.max(0, inventory.stock - item.quantity);
            await inventory.save();
        }
    }

    cart.items = [];
    cart.cartTotal = 0;
    cart.status = "Ordered";
    await cart.save();

    return order;
};

module.exports = {
    validateCartItemQuantity,
    calculateCartTotals,
    getOrCreateCart,
    addItemToCart,
    updateCartItemQuantity,
    removeCartItem,
    clearCart,
    getCart,
    placeOrder
};
