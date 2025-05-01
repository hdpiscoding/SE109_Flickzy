package com.flickzy.controller;

import com.flickzy.base.BaseController;
import com.flickzy.dto.MovieDTO;
import com.flickzy.dto.filters.MovieFilter;
import com.flickzy.service.interfaces.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/movies")
@RequiredArgsConstructor
public class MovieController extends BaseController {
    private final MovieService movieService;

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("")
    public ResponseEntity<Object> createMovie(@RequestBody MovieDTO movieDTO) {
        return buildResponse(movieService.createMovie(movieDTO), HttpStatus.CREATED, "Movie created successfully");
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateMovie(@PathVariable UUID id, @RequestBody MovieDTO movieDTO) {
        return buildResponse(movieService.updateMovie(id, movieDTO), HttpStatus.OK, "Movie updated successfully");
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteMovie(@PathVariable UUID id) {
        movieService.deleteMovie(id);
        return buildResponse(null, HttpStatus.OK, "Movie deleted successfully");
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getMovieDetail(@PathVariable UUID id) {
        return buildResponse(movieService.getMovieDetail(id), HttpStatus.OK, "Movie retrieved successfully");
    }

    @PostMapping("/filter")
    public ResponseEntity<Object> getAllMovies(@RequestBody MovieFilter filters) {
        return buildResponse(movieService.getAllMovies(filters), HttpStatus.OK, "Movies retrieved successfully");
    }
}
