package com.flickzy.service.interfaces;

import com.flickzy.dto.MovieDTO;

import java.util.List;
import java.util.Map;
import java.util.UUID;

public interface MovieService {
    MovieDTO createMovie(MovieDTO movieDTO);
    MovieDTO updateMovie(UUID id, MovieDTO movieDTO);
    void deleteMovie(UUID id);
    List<MovieDTO> getAllMovies(Map<String, Object> filters);
    MovieDTO getMovieDetail(UUID id);
}
