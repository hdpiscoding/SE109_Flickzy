package com.flickzy.service.interfaces;

import com.flickzy.dto.CinemaBrandDTO;
import com.flickzy.dto.PaginatedResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

/**
 * Service interface for managing cinema brand entities.
 */
public interface CinemaBrandService {

    CinemaBrandDTO createCinemaBrand(@Valid CinemaBrandDTO cinemaBrandDTO);

    CinemaBrandDTO updateCinemaBrand(@NotNull UUID id, @Valid CinemaBrandDTO cinemaBrandDTO);

    void deleteCinemaBrand(@NotNull UUID id);

    PaginatedResponse<CinemaBrandDTO> getAllCinemaBrands(Integer page, Integer limit);

    CinemaBrandDTO getCinemaBrandById(@NotNull UUID id);
}