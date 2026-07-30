const axios = require("axios");

const PYTHON_URL = "http://localhost:5001";

const predictDemand = async (payload) => {

    const response = await axios.post(
        `${PYTHON_URL}/predict`,
        payload
    );

    return response.data;

};

module.exports = {
    predictDemand
};