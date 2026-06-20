const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    sku: {
      type: String,
      required: true
    },

    category: {
      type: String,
      required: true
    },

    description: {
      type: String,
      default: ""
    },

    price: {
      type: Number,
      required: true
    },

    quantity: {
      type: Number,
      default: 0
    },

    unit: {
      type: String,
      enum: ["KG", "G", "ML", "L"],
      default: "G"
    },

    stock: {
      type: Number,
      default: 0
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active"
    },

    stockStatus: {
      type: String,
      enum: [
        "In Stock",
        "Low Stock",
        "Out Of Stock"
      ],
      default: "In Stock"
    },

    image: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Product",
  productSchema
);