package com.flickzy.controller;

import com.flickzy.base.BaseController;
import com.flickzy.dto.GenreDTO;
import com.flickzy.service.interfaces.GenreService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/genre")
@RequiredArgsConstructor
public class GenreController extends BaseController {
    private final GenreService genreService;

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("")
    public ResponseEntity<Object> createGenre(@RequestBody GenreDTO genre) {
        return buildResponse(genreService.createGenre(genre), HttpStatus.CREATED,"Genre created successfully");
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/{id}")
    public ResponseEntity<Object> updateGenre(@PathVariable UUID id, @RequestBody GenreDTO genre) {
        return buildResponse(genreService.updateGenre(id, genre), HttpStatus.OK,"Genre updated successfully");
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteGenre(@PathVariable UUID id) {
        genreService.deleteGenre(id);
        return buildResponse(null, HttpStatus.OK,"Genre deleted successfully");
    }

    @GetMapping("")
    public ResponseEntity<Object> getAllGenres() {
        return buildResponse(genreService.getAllGenres(), HttpStatus.OK,"Genres retrieved successfully");
    }
}
