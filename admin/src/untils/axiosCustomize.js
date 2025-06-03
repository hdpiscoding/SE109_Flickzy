import axios from "axios";
import useAuthStore from "../store/useAuthStore";

const getToken = () => {
  return useAuthStore.getState().token;
};

const instance = axios.create({
  baseURL: "http://localhost:8386/api",
  timeout: 1000000,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    console.log("API error", error);
    return Promise.reject(error);
  }
);

export default instance;
