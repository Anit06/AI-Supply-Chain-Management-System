const mongoose = require("mongoose");

const productPriceSchema =
  new mongoose.Schema(
    {
      productId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    },
    {
      timestamps: true
    }
  );

module.exports =
  mongoose.model(
    "ProductPrice",
    productPriceSchema
  );