const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
<<<<<<< HEAD
    {
        fullName: {
            type: String,
            trim: true,
            default: "",
        },
        phone: {
            type: String,
            trim: true,
            default: "",
        },
        addressLine1: {
            type: String,
            trim: true,
            default: "",
        },
        addressLine2: {
            type: String,
            trim: true,
            default: "",
        },
        landmark: {
            type: String,
            trim: true,
            default: "",
        },
        city: {
            type: String,
            trim: true,
            default: "",
        },
        state: {
            type: String,
            trim: true,
            default: "",
        },
        country: {
            type: String,
            trim: true,
            default: "",
        },
        pincode: {
            type: String,
            trim: true,
            default: "",
        },
        addressType: {
            type: String,
            enum: ["Home", "Shop", "Office", "Warehouse", "Other"],
            default: "Home",
        },
        isDefault: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

const shopkeeperDetailsSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
            index: true,
        },
        fullName: {
            type: String,
            trim: true,
            default: "",
        },
        phone: {
            type: String,
            trim: true,
            default: "",
        },
        shopCategory: {
            type: String,
            trim: true,
            default: "All",
        },
        addresses: {
            type: [addressSchema],
            default: [],
        },
    },
    {
        timestamps: true,
    },
=======
  {
    fullName: {
      type: String,
      trim: true,
      default: "",
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    addressLine1: {
      type: String,
      trim: true,
      default: "",
    },
    addressLine2: {
      type: String,
      trim: true,
      default: "",
    },
    landmark: {
      type: String,
      trim: true,
      default: "",
    },
    city: {
      type: String,
      trim: true,
      default: "",
    },
    state: {
      type: String,
      trim: true,
      default: "",
    },
    country: {
      type: String,
      trim: true,
      default: "",
    },
    pincode: {
      type: String,
      trim: true,
      default: "",
    },
    addressType: {
      type: String,
      enum: ["Home", "Shop", "Office", "Warehouse", "Other"],
      default: "Home",
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const shopkeeperDetailsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    fullName: {
      type: String,
      trim: true,
      default: "",
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    shopCategory: {
      type: [String],
      default: [],
    },
    addresses: {
      type: [addressSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
>>>>>>> 8ebc819e3df109c552f8e25d6c537d085fc18a78
);

module.exports = mongoose.model("ShopkeeperDetails", shopkeeperDetailsSchema);
