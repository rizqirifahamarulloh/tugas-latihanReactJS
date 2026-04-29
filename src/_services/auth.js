import API from "../_api";

const storeAuthToken = (responseData) => {
  const token =
    responseData?.token ||
    responseData?.access_token ||
    responseData?.data?.token ||
    responseData?.data?.access_token;

  if (token) {
    localStorage.setItem("token", token);
    localStorage.setItem("access_token", token);
    localStorage.setItem("auth_token", token);
  }

  return token;
};

export const login = async (payload) => {
  const response = await API.post("/login", payload);
  storeAuthToken(response.data);
  return response.data;
};

export const register = async (payload) => {
  const response = await API.post("/register", payload);
  storeAuthToken(response.data);
  return response.data;
};

export const getStoredAuthToken = () => {
  return (
    localStorage.getItem("token") ||
    localStorage.getItem("access_token") ||
    localStorage.getItem("auth_token") ||
    ""
  );
};