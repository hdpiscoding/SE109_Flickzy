import axios from "../untils/axiosCustomize";
export const getARoom = (id) => {
  return axios.get("/v1/rooms/" + id);
};
export const getAllSeatsByRoomId = (id) => {
  return axios.get("/v1/seats/room/" + id);
};
export const getAllBrands = () => {
  return axios.get("/v1/brands");
};
export const getAllCinemas = () => {
  return axios.get("/v1/cinemas");
};
export const getAvailableSnacks = (brandId) => {
  return axios.get("/v1/snacks/available/" + brandId);
};
