import axios from "../untils/axiosCustomize";

export const getAllBlog = async (filter) => {
  // Dùng POST để gửi body đúng chuẩn
  const response = await axios.post("/v1/blogs", filter);
  console.log("filter", filter);
  console.log("response", response);
  return response.data;
};
export const getABlog = async (id) => {
  const response = await axios.get("/v1/blog/" + id);
  return response.data;
};
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
