package com.flickzy.service.interfaces;

import com.flickzy.dto.MovieDTO;
import com.flickzy.dto.PaginatedResponse;
import com.flickzy.dto.filters.MovieFilter;

import java.util.List;
import java.util.Map;
import java.util.UUID;

public interface MovieService {
    MovieDTO createMovie(MovieDTO movieDTO);
    MovieDTO updateMovie(UUID id, MovieDTO movieDTO);
    void deleteMovie(UUID id);
    PaginatedResponse<MovieDTO> getAllMovies(MovieFilter filters);
    MovieDTO getMovieDetail(UUID id);
}
