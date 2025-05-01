package com.flickzy.controller;

import com.flickzy.base.BaseController;
import com.flickzy.dto.MovieShowingDTO;
import com.flickzy.service.interfaces.MovieShowingService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/movie-showings")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class MovieShowingController extends BaseController {
    private final MovieShowingService movieShowingService;

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/movies/{movieId}")
    public ResponseEntity<Object> createMovieShowing(@PathVariable UUID movieId, @RequestBody MovieShowingDTO movieShowingDTO) {
        return buildResponse(movieShowingService.createMovieShowing(movieId, movieShowingDTO), HttpStatus.CREATED, "Movie showing created successfully");
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateMovieShowing(@PathVariable UUID id, @RequestBody MovieShowingDTO movieShowingDTO) {
        return buildResponse(movieShowingService.updateMovieShowing(id, movieShowingDTO), HttpStatus.OK, "Movie showing updated successfully");
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteMovieShowing(@PathVariable UUID id) {
        movieShowingService.deleteMovieShowing(id);
        return buildResponse(null , HttpStatus.OK, "Movie showing deleted successfully");
    }

    @GetMapping("")
    public ResponseEntity<Object> getAllMovieShowings() {
        return buildResponse(movieShowingService.getAllMovieShowings(), HttpStatus.OK, "Movie showings retrieved successfully");
    }

    @GetMapping("/movies/{movieId}")
    public ResponseEntity<Object> getMovieShowingsByMovieId(@PathVariable UUID movieId) {
        return buildResponse(movieShowingService.getAllMovieShowingsByMovie(movieId), HttpStatus.OK, "Movie showings retrieved successfully");
    }
}
