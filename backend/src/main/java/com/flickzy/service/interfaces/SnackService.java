package com.flickzy.service.interfaces;

import com.flickzy.dto.PaginatedResponse;
import com.flickzy.dto.SnackDTO;
import com.flickzy.dto.SnackStatusDTO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

/**
 * Service interface for managing snack entities.
 */
public interface SnackService {

    /**
     * Creates a new snack.
     *
     * @param snackDTO The DTO containing snack details
     * @return Created SnackDTO
     */
    SnackDTO createSnack(@Valid SnackDTO snackDTO);

    /**
     * Updates an existing snack.
     *
     * @param id       The UUID of the snack
     * @param snackDTO The DTO containing updated details
     * @return Updated SnackDTO
     */
    SnackDTO updateSnack(@NotNull UUID id, @Valid SnackDTO snackDTO);

    /**
     * Retrieves all available snacks (isDelete = false, isAvailable = true) with pagination.
     *
     * @param page  The page number (optional, defaults to 1)
     * @param limit The number of items per page (optional, defaults to 10)
     * @return PaginatedResponse containing SnackDTOs
     */
    PaginatedResponse<SnackDTO>  getAllAvailableSnacksByBrand(UUID brandId, Integer page, Integer limit);

    /**
     * Sets the isDelete status of a snack.
     *
     * @param id           The UUID of the snack
     * @param statusDTO    The DTO containing the isDelete status
     */
    void setDeleteStatus(@NotNull UUID id, @Valid SnackStatusDTO statusDTO);

    /**
     * Sets the isAvailable status of a snack.
     *
     * @param id           The UUID of the snack
     * @param statusDTO    The DTO containing the isAvailable status
     */
    void setAvailabilityStatus(@NotNull UUID id, @Valid SnackStatusDTO statusDTO);
}