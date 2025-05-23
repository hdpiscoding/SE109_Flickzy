import axios from "../untils/axiosCustomizeHung";

export const getAllCinema = async () => {
  const response = await axios.get("/v1/cinemas");
  return response.data;
};
export const getACinema = async (id) => {
  const response = await axios.get("/v1/cinemas/" + id);
  return response.data;
};
export const addACinema = async (cinema) => {
  const response = await axios.post("/v1/cinemas", cinema);
  return response.data;
};
export const editACinema = async (id, cinema) => {
  const response = await axios.put(`/v1/cinemas/${id}`, cinema);
  return response.data;
};
export const deleteACinema = async (id) => {
  const response = await axios.delete("/v1/cinemas/" + id);
  return response.data;
};
