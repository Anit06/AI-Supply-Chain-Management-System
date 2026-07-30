const pythonService = require("../services/pythonAIService");

exports.predictDemand = async(req,res)=>{

    try{

        const prediction =
            await pythonService.predictDemand(req.body);

        res.status(200).json(prediction);

    }

    catch(err){

        res.status(500).json({
            message:"Prediction Failed"
        });

    }

}