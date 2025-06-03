import instance from "../untils/axiosCustomize";

export const getAllBlog = async (filter) => {
  // Dùng POST để gửi body đúng chuẩn
  const response = await instance.post("/v1/blogs", filter);
  console.log("filter", filter);
  console.log("response", response);
  return response.data;
};
export const getABlog = async (id) => {
  const response = await instance.get("/v1/blog/" + id);
  return response.data;
};
export const addABlog = async (blog) => {
  const response = await instance.post("/v1/blog", blog);
  return response.data;
};
export const editABlog = async (id, blog) => {
  const response = await instance.put(`/v1/blog/${id}`, blog);
  return response.data;
};
export const deleteABlog = async (id) => {
  const response = await instance.delete("/v1/blog/" + id);
  return response.data;
};
