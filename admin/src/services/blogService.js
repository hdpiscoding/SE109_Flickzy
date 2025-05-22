import axios from "../untils/axiosCustomize";

export const addABlog = async (blog) => {
  const response = await axios.post("/v1/blog", blog);
  return response.data;
};
export const editABlog = async (blog) => {
  const response = await axios.put("/v1/blog", blog);
  return response.data;
};
export const deleteABlog = async (id) => {
  const response = await axios.delete("/v1/blog/" + id);
  return response.data;
};
