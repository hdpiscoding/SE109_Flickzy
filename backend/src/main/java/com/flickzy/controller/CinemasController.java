package com.flickzy.controller;

import com.flickzy.base.BaseController;
import com.flickzy.dto.CinemaDTO;
import com.flickzy.service.interfaces.CinemasService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/cinemas")
@RequiredArgsConstructor
public class CinemasController extends BaseController {
    private final CinemasService cinemaService;

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("")
    public ResponseEntity<Object> createCinema(@RequestBody CinemaDTO cinemaDTO) {
        return buildResponse(cinemaService.createCinema(cinemaDTO), HttpStatus.CREATED, "Cinema created successfully");
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateCinema(@PathVariable UUID id, @RequestBody CinemaDTO cinemaDTO) {
        return buildResponse(cinemaService.updateCinema(id, cinemaDTO), HttpStatus.OK, "Cinema updated successfully");
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteCinema(@PathVariable UUID id) {
        cinemaService.deleteCinema(id);
        return buildResponse(null, HttpStatus.OK, "Cinema deleted successfully");
    }

    @GetMapping("")
    public ResponseEntity<Object> getAllCinemas(@RequestParam(required = false) Integer page,
                                               @RequestParam(required = false) Integer limit) {
        return buildResponse(cinemaService.getAllCinemas(page, limit), HttpStatus.OK, "Cinemas retrieved successfully");
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getCinemaById(@PathVariable UUID id) {
        return buildResponse(cinemaService.getCinemaById(id), HttpStatus.OK, "Cinema retrieved successfully");
    }
}