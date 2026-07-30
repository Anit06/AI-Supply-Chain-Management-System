import api from "./api";

/*
===================================
ADD PRODUCT TO CART
===================================
*/
export const addToCart = async (data) => {
    const response = await api.post("/cart", data);
    return response.data;
};

/*
===================================
GET CART
===================================
*/
export const getCart = async (warehouseId) => {
    const response = await api.get(`/cart/${warehouseId}`);
    return response.data;
};

/*
===================================
UPDATE CART
===================================
*/
export const updateCart = async (data) => {
    const response = await api.put("/cart", data);
    return response.data;
};

/*
===================================
REMOVE ITEM
===================================
*/
export const removeCartItem = async (productId, warehouseId) => {
    const response = await api.delete(`/cart/${productId}`, {
        data: {
            warehouseId
        }
    });

    return response.data;
};

/*
===================================
CLEAR CART
===================================
*/
export const clearCart = async (warehouseId) => {
    const response = await api.delete(`/cart/clear/${warehouseId}`);
    return response.data;
};

/*
===================================
PLACE ORDER
===================================
*/
export const placeOrder = async (orderData) => {
    const response = await api.post("/cart/place-order", orderData);

    return response.data;
};