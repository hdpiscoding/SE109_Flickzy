import axios from "../untils/axiosCustomize";
export const addRoom = (body) => {
  return axios.post("v1/rooms", body);
};
export const getAllSeatTypes = () => {
  return axios.get("v1/seat-types");
};
export const addSeat = (body) => {
  return axios.post("/v1/seats", body);
};
export const addSeatType = (body) => {
  return axios.post("/v1/seat-types", body);
};
export const deleteSeatType = (id) => {
  return axios.delete("/v1/seat-types/" + id);
};
export const getAllRooms = () => {
  return axios.get("/v1/rooms");
};
export const deleteRoom = (id) => {
  return axios.delete("/v1/rooms/" + id);
};
