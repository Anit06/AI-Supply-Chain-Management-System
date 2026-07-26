const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
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

const orderSchema = new mongoose.Schema(
    {
        orderNumber: {
            type: String,
            unique: true,
            trim: true
        },
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
        items: [orderItemSchema],
        grandTotal: {
            type: Number,
            default: 0
        },
        status: {
            type: String,
            enum: ["Pending", "Confirmed", "Packed", "Shipped", "Delivered", "Cancelled"],
            default: "Pending"
        }
    },
    {
        timestamps: true
    }
);

orderSchema.pre("save", async function (next) {
    if (!this.orderNumber) {
        const count = await mongoose.models.Order.countDocuments();
        this.orderNumber = `ORD-${String(count + 1).padStart(4, "0")}`;
    }
    next();
});

module.exports = mongoose.model("Order", orderSchema);
