const axios = require("axios");

<<<<<<< HEAD
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
=======
const PYTHON_URL = process.env.PYTHON_SERVICE_URL || "http://localhost:5001";

const predictDemand = async (payload) => {
    const response = await axios.post(`${PYTHON_URL}/predict`, payload);
    return response.data;
};

const predictAllDemand = async () => {
    const response = await axios.get(`${PYTHON_URL}/predict-all`);
    return response.data;
};

const predictAllLive = async (currentMonthDemand, warehouseProducts) => {
    const payload = {
        warehouseProducts,
        currentMonthDemand: (currentMonthDemand || []).map(item => ({
            warehouseName: item.warehouseName,
            productName: item.productName,
            quantity: item.currentMonthDemand
        }))
    };

    const response = await axios.post(`${PYTHON_URL}/predict-all-live`, payload, {
        timeout: 15000
    });

    return response.data;
};

const reloadModel = async () => {
    const response = await axios.post(`${PYTHON_URL}/reload-model`);
    return response.data;
};

module.exports = {
    predictDemand,
    predictAllDemand,
    predictAllLive,
    reloadModel
>>>>>>> 8ebc819e3df109c552f8e25d6c537d085fc18a78
};