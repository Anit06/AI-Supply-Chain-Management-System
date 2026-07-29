const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const historyController = require("../controllers/historyController");

router.post(
    "/generate-history",
    historyController.generateHistory
);

router.post(

    "/retrain",

    authMiddleware,

    historyController.retrainAI

);

module.exports = router;