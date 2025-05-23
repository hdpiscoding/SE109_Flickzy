package com.flickzy.service.interfaces;

import com.flickzy.dto.CinemaDTO;
import com.flickzy.dto.PaginatedResponse;

import java.util.UUID;

public interface CinemasService {
    CinemaDTO createCinema(CinemaDTO cinemaDTO);
    CinemaDTO updateCinema(UUID id, CinemaDTO cinemaDTO);
    void deleteCinema(UUID id);
    PaginatedResponse<CinemaDTO> getAllCinemas(Integer page, Integer limit);
    CinemaDTO getCinemaById(UUID id);
}