package com.flickzy.service.interfaces;

import com.flickzy.dto.PaginatedResponse;
import com.flickzy.dto.SeatTypeDTO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

/**
 * Service interface for managing seat type entities.
 */
public interface SeatTypeService {

    /**
     * Creates a new seat type.
     *
     * @param seatTypeDTO The DTO containing seat type details
     * @return Created SeatTypeDTO
     */
    SeatTypeDTO createSeatType(@Valid SeatTypeDTO seatTypeDTO);

    /**
     * Updates an existing seat type.
     *
     * @param seatTypeId  The UUID of the seat type
     * @param seatTypeDTO The DTO containing updated details
     * @return Updated SeatTypeDTO
     */
    SeatTypeDTO updateSeatType(@NotNull UUID seatTypeId, @Valid SeatTypeDTO seatTypeDTO);

    /**
     * Deletes a seat type by ID.
     *
     * @param seatTypeId The UUID of the seat type
     */
    void deleteSeatType(@NotNull UUID seatTypeId);

    /**
     * Retrieves all seat types with pagination.
     *
     * @param page  The page number (optional, defaults to 1)
     * @param limit The number of items per page (optional, defaults to 10)
     * @return PaginatedResponse containing SeatTypeDTOs
     */
    PaginatedResponse<SeatTypeDTO> getAllSeatTypes(Integer page, Integer limit);

    /**
     * Retrieves a seat type by ID.
     *
     * @param seatTypeId The UUID of the seat type
     * @return SeatTypeDTO
     */
    SeatTypeDTO getSeatTypeById(@NotNull UUID seatTypeId);
}