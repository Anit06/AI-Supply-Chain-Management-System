import API from "./api";

export const getMyOrders = () => API.get("/orders/mine");
export const getOrderById = (orderId) => API.get(`/orders/${orderId}`);
