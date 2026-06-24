const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
<<<<<<< HEAD
    sku: {
      type: String,
      required: true,
      unique: true
    },
    category: String,
    description: String,
=======

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

>>>>>>> eb5a4f2783018f24536dfc00e581d7e0d4789b96
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active"
    },
<<<<<<< HEAD
    image: String
=======

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
>>>>>>> eb5a4f2783018f24536dfc00e581d7e0d4789b96
  },
  {
    timestamps: true
  }
);

<<<<<<< HEAD
module.exports =
  mongoose.model(
    "Product",
    productSchema
  );
=======
module.exports = mongoose.model(
  "Product",
  productSchema
);
>>>>>>> eb5a4f2783018f24536dfc00e581d7e0d4789b96
