const Prediction = require("../models/Prediction");

const syncPredictions = async (predictions) => {
    if (!Array.isArray(predictions) || predictions.length === 0) {
        console.warn("Prediction sync skipped: empty or invalid predictions array.");
        return [];
    }

    const result = await Prediction.bulkWrite(
        predictions.map(prediction => ({
            updateOne: {
                filter: {
                    warehouseName: prediction.warehouseName,
                    productName: prediction.productName,
                    targetMonth: prediction.targetMonth,
                    targetYear: prediction.targetYear
                },
                update: { $set: prediction },
                upsert: true
            }
        })),
        { ordered: true }
    );

    console.info(
        `Prediction sync complete: matched=${result.matchedCount}, ` +
        `modified=${result.modifiedCount}, inserted=${result.upsertedCount}.`
    );

    return Prediction.find({
        $or: predictions.map(prediction => ({
            warehouseName: prediction.warehouseName,
            productName: prediction.productName,
            targetMonth: prediction.targetMonth,
            targetYear: prediction.targetYear
        }))
    }).sort({ warehouseName: 1, productName: 1 });
};

const getPrediction = async () => {
    return await Prediction.find().sort({ warehouseName: 1, productName: 1 });
};

module.exports = {
    syncPredictions,
    getPrediction
};
