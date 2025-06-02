import instance from '../untils/axiosCustomize';

export const getAllMovies = async (filter) => {
    const response = await instance.post('/v1/movies/filter', filter);
    return response.data;
}

export const getAllGenres = async () => {
    const response = await instance.get('/v1/genres');
    return response.data;
}

export const getMovieDetail = async (id) => {
    const response = await instance.get(`/v1/movies/${id}`);
    return response.data;
}

export const getAllCinemaBrands = async () => {
    const response = await instance.get('/v1/brands');
    return response.data;
}

export const getAllMovieReviews = async (movieId, page, limit) => {
    const response = await instance.get(`/v1/reviews/${movieId}?page=${page}&limit=${limit}`);
    return response.data;
}

export const isUserReviewed = async (movieId) => {
    const response = await instance.get(`/v1/reviews/me/${movieId}/is-reviewed`);
    return response.data;
}

export const canUserReview = async (movieId) => {
    const response = await instance.get(`/v1/reviews/me/${movieId}/can-review`);
    return response.data;
}

export const createMovieReview = async (movieId, data) => {
    const response = await instance.post(`/v1/reviews/${movieId}`, data);
    return response.data;
}

export const getAllMovieSchedule = async (filter) => {
    const response = await instance.post(`/v1/schedule-by-movie`, filter);
    return response.data;
}