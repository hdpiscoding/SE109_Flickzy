import axios from "../untils/axiosCustomize";
import instance from "../untils/axiosCustomize";

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
export const getAllSchedule = () => {
  return axios.get("/v1/schedules");
};
export const getAllMovies = async (filter) => {
  const response = await instance.post("/v1/movies/filter", filter);
  return response.data;
};

export const addSchedule = (
  movieId,
  roomId,
  scheduleDate,
  scheduleStart,
  scheduleEnd,
  TypeId
) => {
  return axios.post("/v1/schedule", {
    movieId: movieId,
    roomId: roomId,
    scheduleDate: scheduleDate,
    scheduleStart: scheduleStart,
    scheduleEnd: scheduleEnd,
    typeId: TypeId,
  });
};
export const deleteSchedule = (id) => {
  return axios.delete("/v1/schedule/" + id);
};
