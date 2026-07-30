const express = require("express");

const router = express.Router();

const aiController =
require("../controllers/aiController");

router.post(
    "/predict",
    aiController.predictDemand
);

module.exports = router;