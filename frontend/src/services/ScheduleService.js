import axios from "../untils/axiosCustomize";
export const getScheduleByCinemaAndDate = (cinemaId, date) => {
  return axios.post("/v1/schedule-by-cinema", {
    cinemaId: cinemaId,
    date: date,
  });
};
