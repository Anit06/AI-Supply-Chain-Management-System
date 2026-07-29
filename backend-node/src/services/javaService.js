const axios = require("axios");

const api = axios.create({
    baseURL: process.env.JAVA_SERVICE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

/*
==============================
Inventory APIs
==============================
*/

exports.addInventory = (data) => api.post("", data);

exports.getInventoryByWarehouse = (id) =>
    api.get(`/warehouse/${id}`);

exports.updateInventory = (id, stock) =>
    api.put(`/${id}?stock=${stock}`);

exports.deleteInventory = (id) =>
    api.delete(`/${id}`);

/*
==============================
Reduce Stock After Order
==============================
*/

exports.reduceInventory = (data) =>
    api.put("/reduce", data);

/*
==================================
RETURN STOCK AFTER CANCEL
==================================
*/

exports.addInventoryStock = (data)=>

    api.put("/add",data);

exports.getAllInventory = () => api.get("");