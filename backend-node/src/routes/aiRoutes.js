const express = require("express");

const router = express.Router();

const aiController = require("../controllers/aiController");

const authMiddleware = require("../middleware/authMiddleware");

/*
====================================
Single Prediction
====================================
*/

router.post(

    "/predict",

    authMiddleware,

    aiController.predictDemand

);

/*
====================================
Predict All Products
====================================
*/

router.post(

    "/predict-all",

    authMiddleware,

    aiController.predictAllDemand

);

router.get(
    "/predictions",
    authMiddleware,
    aiController.getPredictions
);

router.post(

    "/train-model",

    authMiddleware,

    aiController.trainModel

);

router.get(

    "/current-demand",

    authMiddleware,

    aiController.getCurrentMonthDemand

);

module.exports = router;