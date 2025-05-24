import axios from "../untils/axiosCustomizeHung";

export const getAllBrand = async () => {
  const response = await axios.get("/v1/brands");
  return response.data;
};
export const getABrand = async (id) => {
  const response = await axios.get("/v1/brands/" + id);
  return response.data;
};
export const addABrand = async (Brand) => {
  const response = await axios.post("/v1/brands", Brand);
  return response.data;
};
export const editABrand = async (id, Brand) => {
  const response = await axios.put(`/v1/brands/${id}`, Brand);
  return response.data;
};
export const deleteABrand = async (id) => {
  const response = await axios.delete("/v1/brands/" + id);
  return response.data;
};
