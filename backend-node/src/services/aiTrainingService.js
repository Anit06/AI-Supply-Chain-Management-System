const { exec } = require("child_process");
const path = require("path");

const pythonAIService = require("./pythonAIService");

const trainModel = () => {

    return new Promise((resolve, reject) => {

        const script = path.join(
            __dirname,
            "../../../python-ai-service/train_model.py"
        );

        exec(`python "${script}"`, async (error, stdout, stderr) => {

            if (error) {
                return reject(error);
            }

            try {

                await pythonAIService.reloadModel();

                resolve(stdout);

            } catch (err) {

                reject(err);

            }

        });

    });

};

module.exports = {

    trainModel

};