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
<<<<<<< HEAD
  inventorySchema
);
=======
  inventorySchema,
  // Spring Boot owns this shared collection and explicitly names it
  // `inventory`; Mongoose would otherwise query its pluralized `inventories`.
  "inventory"
);
>>>>>>> 8ebc819e3df109c552f8e25d6c537d085fc18a78
