const mongoose = require("mongoose");

const warehouseSchema =
  new mongoose.Schema(
    {
      code: {
        type: String,
        required: true,
        unique: true
      },

      name: {
        type: String,
        required: true
      },

      location: {
        type: String,
        required: true
      },

      city: {
        type: String,
        required: true
      },

      country: {
        type: String,
        default: "India"
      },

      capacity: {
        type: Number,
        required: true
      },

      available: {
        type: Number,
        required: true
      },

      manager: {
        type: String,
        required: true
      },

      phone: {
        type: String,
        required: true
      },

      status: {
        type: String,
        enum: [
          "Active",
          "Inactive",
          "Full",
          "Under Maintenance"
        ],
        default: "Active"
      }
    },
    {
      timestamps: true
    }
  );

module.exports =
  mongoose.model(
    "Warehouse",
    warehouseSchema
  );