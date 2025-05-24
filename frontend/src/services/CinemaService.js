import axios from "../untils/axiosCustomize";
export const getAllBrand = async () => {
  const response = await axios.get("/v1/brands");
  return response.data;
};
export const getAllCinema = async () => {
  const response = await axios.get("/v1/cinemas");
  return response.data;
};
export const getACinema = async (id) => {
  const response = await axios.get("/v1/cinemas/" + id);
  return response.data;
};
export const getACinemaBrand = async (id) => {
  const response = await axios.get("/v1/brands/" + id);
  console.log("response", response);

  return response.data;
};
