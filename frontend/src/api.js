import axios from "axios";

const api = axios.create({
  baseURL: "http://backend:5000"
});

// attach token
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export default api;