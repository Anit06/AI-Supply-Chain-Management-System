const mongoose = require("mongoose")

const supplierSchema =
    new mongoose.Schema(
        {
            supplierCode: {
                type: String,
                required: true,
                unique: true
            },

            supplierName: {
                type: String,
                required: true
            },
            supplierPhonenumber: {
                type: String,
                required: true
            },
            supplierAddress: {
                type: String,
                required: true
            },
            supplierVehiclenumber: {
                type: String,
                required: true
            },
            supplierCapacity: {
                type: String,
                required: true
            },
            currentAssignedWeight: {
                type: Number,
                default: 0
            }

        },
        {
            timestamps: true
        }
    );

module.exports =
    mongoose.model(
        "Supplier",
        supplierSchema
    );