const pythonService = require("../services/pythonAIService");
const aiDemandService = require("../services/aiDemandService");
const predictionService = require("../services/predictionService");
const aiTrainingService = require("../services/aiTrainingService");

exports.predictDemand = async (req, res) => {
    try {
        const prediction = await pythonService.predictDemand(req.body);
        if (!prediction?.success || !Number.isFinite(Number(prediction.predictedDemand))) {
            return res.status(502).json({
                success: false,
                message: prediction?.message || "AI microservice returned an invalid prediction."
            });
        }

        const now = new Date();
        const targetDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        const record = {
            warehouseName: req.body.warehouseName,
            productName: req.body.productName,
            category: req.body.category,
            currentMonthDemand: Number(req.body.currentMonthDemand ?? req.body.previousMonthDemand ?? 0),
            sameMonthLastYearDemand: Number(req.body.sameMonthLastYearDemand ?? 0),
            predictedDemand: Number(prediction.predictedDemand),
            targetMonth: Number(req.body.targetMonth ?? targetDate.getMonth() + 1),
            targetYear: Number(req.body.targetYear ?? targetDate.getFullYear()),
            unit: prediction.unit || "Units"
        };
        const [saved] = await predictionService.syncPredictions([record]);
        console.info(`Saved single prediction for ${record.warehouseName}/${record.productName}.`);
        return res.status(200).json({ success: true, prediction: saved });
    } catch (err) {
        console.error("Single Prediction Error:", err);
        return res.status(500).json({
            success: false,
            message: "Prediction Failed"
        });
    }
};

exports.predictAllDemand = async (req, res) => {
    try {
        const currentMonthDemand = await aiDemandService.getCurrentMonthDemand();
        const warehouseProducts = await aiDemandService.getWarehouseProducts();

        console.info(
            `Prediction request: inventoryProducts=${warehouseProducts.length}, ` +
            `currentDemandRows=${currentMonthDemand.length}.`
        );

        if (warehouseProducts.length === 0) {
            return res.status(422).json({
                success: false,
                message: "No warehouse products were found. Check inventory warehouse/product references."
            });
        }

        const result = await pythonService.predictAllLive(
            currentMonthDemand,
            warehouseProducts
        );

        if (!result || !result.success || !Array.isArray(result.predictions) || result.predictions.length === 0) {
            console.error("Python microservice returned empty predictions array:", result);
            return res.status(500).json({
                success: false,
                message: result?.message || "AI Microservice returned no predictions."
            });
        }

        // Upsert first so an AI/database failure cannot erase the last valid
        // prediction set.
        const saved = await predictionService.syncPredictions(result.predictions);

        console.log(`Saved ${saved.length} prediction documents into MongoDB.`);

        return res.status(200).json({
            success: true,
            count: saved.length,
            predictions: saved
        });
    } catch (error) {
        console.error("Predict All Demand Controller Error:", error);
        return res.status(500).json({
            success: false,
            message: error.response?.data?.message || error.message
        });
    }
};

exports.getCurrentMonthDemand = async (req, res) => {
    try {
        const data = await aiDemandService.getCurrentMonthDemand();
        return res.json({ success: true, data });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

exports.trainModel = async (req, res) => {
    try {
        const result = await aiTrainingService.trainModel();
        return res.status(200).json({
            success: true,
            message: "Model trained successfully",
            output: result
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: err.message });
    }
};

exports.getPredictions = async (req, res) => {
    try {
        const predictions = await predictionService.getPrediction();
        return res.json({ success: true, count: predictions.length, predictions });
    } catch (error) {
        console.error("Get Predictions Controller Error:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};