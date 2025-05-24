import axios from "axios";
import useAuthStore from "../store/useAuthStore";


const getToken = () => {
  return useAuthStore.getState().token;
};

const instance = axios.create({
  baseURL: "http://localhost:8386/api/",
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
        config.headers['Authorization'] = `Bearer ${token}`;
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
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log("API error", error);
    return Promise.reject(error);
  }
);
export default instance;
