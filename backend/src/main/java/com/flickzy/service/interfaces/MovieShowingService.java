package com.flickzy.service.interfaces;

import com.flickzy.dto.MovieShowingDTO;

import java.util.List;
import java.util.UUID;

public interface MovieShowingService {
    MovieShowingDTO createMovieShowing(UUID movieId, MovieShowingDTO movieShowingDTO);
    MovieShowingDTO updateMovieShowing(UUID id, MovieShowingDTO movieShowingDTO);
    void deleteMovieShowing(UUID id);
    List<MovieShowingDTO> getAllMovieShowingsByMovie(UUID movieId);
    List<MovieShowingDTO> getAllMovieShowings();
}
