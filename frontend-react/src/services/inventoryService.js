import api from "./api";

/*
====================================
GET INVENTORY OF WAREHOUSE
====================================
*/

export const getInventory = (warehouseId) => {

    return api.get(`/inventory/warehouse/${warehouseId}`);

};

/*
====================================
ADD INVENTORY
====================================
*/

export const addInventory = async (data) => {
    const response = await api.post("/inventory", data);
    return response.data;
};

/*
====================================
UPDATE STOCK
====================================
*/

export const updateInventory = (inventoryId, stock) => {

    return api.put(
        `/inventory/${inventoryId}`,
        { stock }
    );

};

/*
====================================
DELETE INVENTORY
====================================
*/

export const deleteInventory = (inventoryId) => {

    return api.delete(`/inventory/${inventoryId}`);

};