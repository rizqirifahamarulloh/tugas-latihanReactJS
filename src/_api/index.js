import axios from "axios";

export const API_BASE = "http://127.0.0.1:8000";

const API = axios.create({
  // baseURL: "https://akmal-bc.karyakreasi.id/api/v1",
  baseURL: `${API_BASE}/api`,
});

API.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("access_token") ||
    localStorage.getItem("auth_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;