import API from "./api";

// Place Order
export const placeOrder = async (data) => {
    const response = await API.post("/orders/place", data);
    return response.data;
};

// Order History
export const getOrderHistory = async () => {
    const response = await API.get("/orders/history");
    return response.data;
};

// My Orders
export const getMyOrders = async () => {
    const response = await API.get("/orders/mine");
    return response.data;
};

// Get Single Order
export const getOrderById = async (orderId) => {
    const response = await API.get(`/orders/${orderId}`);
    return response.data;
};