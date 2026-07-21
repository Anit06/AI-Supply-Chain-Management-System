const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        productName: {
            type: String,
            required: true,
            trim: true
        },
        price: {
            type: Number,
            required: true,
            default: 0
        },
        quantity: {
            type: Number,
            required: true,
            default: 1,
            min: 1
        },
        unit: {
            type: String,
            default: "KG"
        },
        subtotal: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        warehouseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Warehouse",
            required: true
        },
        items: [cartItemSchema],
        cartTotal: {
            type: Number,
            default: 0
        },
        status: {
            type: String,
            enum: ["Active", "Ordered", "Abandoned"],
            default: "Active"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Cart", cartSchema);
