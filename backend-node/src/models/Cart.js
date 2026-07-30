const mongoose = require("mongoose");

/*
=========================================
Cart Item Schema
=========================================
*/

const cartItemSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },

        productName: {
            type: String,
            required: true
        },

        category: {
            type: String,
            default: ""
        },

        image: {
            type: String,
            default: ""
        },

        sku: {
            type: String,
            default: ""
        },

        description: {
            type: String,
            default: ""
        },

        unit: {
            type: String,
            default: "KG"
        },

        price: {
            type: Number,
            required: true
        },

        quantity: {
            type: Number,
            required: true,
            default: 1
        },

        subtotal: {
            type: Number,
            required: true,
            default: 0
        }

    },
    {
        _id: true
    }
);

/*
=========================================
Cart Schema
=========================================
*/

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

        items: {
            type: [cartItemSchema],
            default: []
        },

        cartTotal: {
            type: Number,
            default: 0
        }

    },

    {
        timestamps: true
    }

);

/*
=========================================
One Cart Per User Per Warehouse
=========================================
*/

cartSchema.index(
    {
        userId: 1,
        warehouseId: 1
    },
    {
        unique: true
    }
);

/*
=========================================
Export Model
=========================================
*/

module.exports = mongoose.model("Cart", cartSchema);