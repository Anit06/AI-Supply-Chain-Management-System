import axios from "axios";

const API =
  "http://localhost:5000/api/warehouses";

export const getWarehouses =
  async () => {
    const res =
      await axios.get(API);

    return res.data;
  };

export const addWarehouse =
  async (data) => {
    const res =
      await axios.post(
        API,
        data
      );

    return res.data;
  };

export const updateWarehouse =
  async (id, data) => {
    const res =
      await axios.put(
        `${API}/${id}`,
        data
      );

    return res.data;
  };

export const deleteWarehouse =
  async (id) => {
    const res =
      await axios.delete(
        `${API}/${id}`
      );

    return res.data;
  };