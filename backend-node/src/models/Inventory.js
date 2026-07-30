const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    warehouse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouse",
      required: true
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },

    stock: {
      type: Number,
      required: true,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Inventory",
  inventorySchema
);