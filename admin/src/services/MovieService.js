import instance from '../untils/axiosCustomize';

export const getAllMovies = async (filter) => {
    const response = await instance.post('/v1/movies/filter', filter);
    return response.data;
}

export const getMovieDetail = async (id) => {
    const response = await instance.get(`/v1/movies/${id}`);
    return response.data;
}

export const getMovieShowing = async (movieId) => {
    const response = await instance.get(`/v1/movie-showings/movies/${movieId}`);
    return response.data;
}

export const getAllGenres = async () => {
    const response = await instance.get('/v1/genres');
    return response.data;
}

export const updateMovie = async (id, data) => {
    const response = await instance.put(`/v1/movies/${id}`, data);
    return response.data;
}

export const updateMovieShowing = async (id, data) => {
    const response = await instance.put(`/v1/movie-showings/${id}`, data);
    return response.data;
}

export const createMovie = async (data) => {
    const response = await instance.post('/v1/movies', data);
    return response.data;
}

export const createMovieShowing = async (movieId, data) => {
    const response = await instance.post(`/v1/movie-showings/movies/${movieId}`, data);
    return response.data;
}