import axios from "axios";

const API_URL =
  "http://localhost:5000/api/auth";

export const registerUser =
  async (userData) => {

    const response =
      await axios.post(
        `${API_URL}/register`,
        userData
      );

    return response.data;
  };

export const loginUser =
  async (userData) => {

    const response =
      await axios.post(
        `${API_URL}/login`,
        userData
      );

    return response.data;
  };

export const getUsers =
  async () => {

    const response =
      await fetch(
        `${API_URL}/users`
      );

    return response.json();
  };

export const updateRole =
  async (
    id,
    userData
  ) => {

    const response =
      await fetch(
        `${API_URL}/users/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify(
            userData
          )
        }
      );

    return response.json();
  };