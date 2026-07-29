const historyService = require("../services/historyGeneratorService");
const aiTrainingService = require("../services/aiTrainingService");
const pythonService = require("../services/pythonAIService");

const generateHistory = async (req, res) => {

    try {

        const result =
            await historyService.generateMonthlyHistory();

        return res.json(result);

    } catch (err) {

        return res.status(500).json({

            success: false,
            message: err.message

        });

    }

};

const retrainAI = async (req, res) => {

    try {

        const csv =
            await historyService.generateMonthlyHistory();

        const training =
            await aiTrainingService.trainModel();

        const reload =
            await pythonService.reloadModel();

        return res.json({

            success: true,
            csv,
            training,
            reload

        });

    } catch (err) {

        return res.status(500).json({

            success: false,
            message: err.message

        });

    }

};

module.exports = {

    generateHistory,
    retrainAI

};