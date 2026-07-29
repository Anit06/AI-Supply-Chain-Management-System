import api from "./api";

/*
===========================
Single Prediction
===========================
*/

export const getPrediction = async (data) => {

    const response = await api.post(
        "/ai/predict",
        data
    );

    return response.data;
};

/*
===========================
Predict All Products
===========================
*/

export const getAllPredictions = async () => {

    const response = await api.post(
        "/ai/predict-all"
    );

    return response.data;
};

export const getStoredPredictions = async () => {
    const response = await api.get("/ai/predictions");
    return response.data;
};
