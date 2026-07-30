import api from "./api";

export const getPrediction = async (data) => {
    const response = await api.post("/ai/predict", data);
    return response.data;
};