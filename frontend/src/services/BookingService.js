import axios from "../untils/axiosCustomize";
export const getARoom = (id) => {
  return axios.get("api/rooms/" + id);
};
export const getAllSeatsByRoomId = (id) => {
  return axios.get("api/seats/room/" + id);
};
