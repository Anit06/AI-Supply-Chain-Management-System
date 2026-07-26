import axios from "axios";

const API =
  "http://localhost:5000/api/products";

export const getProducts =
  async () => {

    const response =
      await axios.get(API);

    return response.data;
  };

export const addProduct = async (
  productData
) => {

  const response =
    await axios.post(
      "http://localhost:5000/api/products",
      productData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data"
        }
      }
    );

  return response.data;
};

export const updateProduct =
  async (
    id,
    formData
  ) => {

    const response =
      await axios.put(
        `${API}/${id}`,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data"
          }
        }
      );

    return response.data;
  };

export const deleteProduct =
  async (id) => {

    const response =
      await axios.delete(
        `${API}/${id}`
      );

    return response.data;
  };