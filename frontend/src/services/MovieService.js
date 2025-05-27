import instance from "../untils/axiosCustomize";

export const getAllMovies = async (filter) => {
  const response = await instance.post("/v1/movies/filter", filter);
  return response.data;
};

export const getAllGenres = async () => {
  const response = await instance.get("/v1/genres");
  return response.data;
};

export const getMovieDetail = async (id) => {
  const response = await instance.get(`/v1/movies/${id}`);
  return response.data;
};

export const getAllCinemaBrands = async () => {
  const response = await instance.get("/v1/brands");
  return response.data;
};
