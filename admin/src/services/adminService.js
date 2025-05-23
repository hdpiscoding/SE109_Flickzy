import axios from "../untils/axiosCustomize";
export const addRoom = (body) => {
  return axios.post("api/rooms", body);
};
export const getAllSeatTypes = () => {
  return axios.get("api/seat-types");
};
export const addSeat = (body) => {
  return axios.post("api/seats", body);
};
export const addSeatType = (body) => {
  return axios.post("api/seat-types", body);
};
export const deleteSeatType = (id) => {
  return axios.delete("api/seat-types/" + id);
};
