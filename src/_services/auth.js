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

const storeUserInfo = (responseData) => {
  const user =
    responseData?.user ||
    responseData?.data?.user ||
    responseData?.data ||
    responseData?.userInfo ||
    responseData?.data?.userInfo ||
    null;

  if (user) {
    try {
      localStorage.setItem("userInfo", JSON.stringify(user));
    } catch (e) {
      // ignore
    }
  }

  return user;
};

export const login = async (payload) => {
  const response = await API.post("/login", payload);
  storeAuthToken(response.data);
  storeUserInfo(response.data);
  return response.data;
};

export const register = async (payload) => {
  const response = await API.post("/register", payload);
  storeAuthToken(response.data);
  storeUserInfo(response.data);
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

export const getStoredUserInfo = () => {
  try {
    const raw = localStorage.getItem("userInfo") || "";
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
};

export const logout = () => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("auth_token");
    localStorage.removeItem("userInfo");
  } catch (e) {
    // ignore
  }
};