const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema(
    {
        warehouseName: { type: String, required: true },
        productName: { type: String, required: true },
        category: { type: String, required: true },
        currentMonthDemand: { type: Number, default: 0 },
        sameMonthLastYearDemand: { type: Number, default: 0 },
        predictedDemand: { type: Number, required: true },
        targetMonth: { type: Number, required: true },
        targetYear: { type: Number, required: true },
        unit: { type: String, default: "Units" }
    },
    { timestamps: true }
);

predictionSchema.index(
    { warehouseName: 1, productName: 1, targetMonth: 1, targetYear: 1 },
    { unique: true }
);

module.exports = mongoose.model("Prediction", predictionSchema);
