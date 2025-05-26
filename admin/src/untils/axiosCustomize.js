import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8386/api",
  timeout: 1000000,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Lấy token từ localStorage và set vào header Authorization dạng Bearer
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
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
