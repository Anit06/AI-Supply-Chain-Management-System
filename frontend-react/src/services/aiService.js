import api from "./api";

<<<<<<< HEAD
export const getPrediction = async (data) => {
    const response = await api.post("/ai/predict", data);
    return response.data;
};
=======
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
>>>>>>> 8ebc819e3df109c552f8e25d6c537d085fc18a78
