import API from "./api";

export const addToCart = (data) => API.post("/cart/add", data);
export const getCart = (warehouseId) => API.get(`/cart/${warehouseId}`);
export const updateCart = (data) => API.put("/cart/update", data);
export const removeCartItem = (itemId, warehouseId) => API.delete(`/cart/item/${itemId}`, { data: { warehouseId } });
export const clearCart = (warehouseId) => API.delete(`/cart/clear/${warehouseId}`);
export const placeOrder = (warehouseId) => API.post("/cart/place-order", { warehouseId });
