package com.flickzy.service.interfaces;

import com.flickzy.dto.CinemaDTO;
import com.flickzy.dto.CinemaFilterDTO;
import com.flickzy.dto.PaginatedResponse;

import jakarta.validation.Valid;

import java.util.UUID;

public interface CinemasService {
    CinemaDTO createCinema(CinemaDTO cinemaDTO);
    CinemaDTO updateCinema(UUID id, CinemaDTO cinemaDTO);
    void deleteCinema(UUID id);
    // PaginatedResponse<CinemaDTO> getAllCinemas(Integer page, Integer limit);
    CinemaDTO getCinemaById(UUID id);
    PaginatedResponse<CinemaDTO> getAllCinemasFilter(@Valid CinemaFilterDTO filterDTO, Integer page, Integer limit);
}