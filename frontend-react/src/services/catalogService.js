import api from "./api";

/*

GET PRODUCTS OF A WAREHOUSE
*/

export const getWarehouseCatalog = (warehouseId) => {
  return api.get(`/catalog/warehouse/${warehouseId}`);
};
