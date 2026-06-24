const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    category: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      default: ""
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    quantity: {
      type: Number,
      default: 0,
      min: 0
    },

    unit: {
      type: String,
      enum: ["KG", "G", "ML", "L"],
      default: "G"
    },

    stock: {
      type: Number,
      default: 0,
      min: 0
    },

    stockStatus: {
      type: String,
      enum: ["In Stock", "Low Stock", "Out Of Stock"],
      default: "In Stock"
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active"
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

module.exports = mongoose.model("Product", productSchema);