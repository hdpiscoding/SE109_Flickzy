package com.flickzy.service.interfaces;

import com.flickzy.dto.PaginatedResponse;
import com.flickzy.dto.SeatDTO;
import com.flickzy.projection.SeatProjection;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

import java.util.List;
import java.util.UUID;

/**
 * Service interface for managing seat entities.
 */
public interface SeatsService {

    /**
     * Creates a new seat.
     *
     * @param seatDTO The DTO containing seat details
     * @return Created SeatDTO
     */
    SeatDTO createSeat(@Valid SeatDTO seatDTO);

    /**
     * Updates an existing seat.
     *
     * @param seatId  The UUID of the seat
     * @param seatDTO The DTO containing updated details
     * @return Updated SeatDTO
     */
    SeatDTO updateSeat(@NotNull UUID seatId, @Valid SeatDTO seatDTO);

    /**
     * Deletes a seat by ID.
     *
     * @param seatId The UUID of the seat
     */
    void deleteSeat(@NotNull UUID seatId);

    /**
     * Retrieves all seats with pagination.
     *
     * @param page  The page number (optional, defaults to 1)
     * @param limit The number of items per page (optional, defaults to 10)
     * @return PaginatedResponse containing SeatDTOs
     */
    PaginatedResponse<SeatDTO> getAllSeats(Integer page, Integer limit);

    /**
     * Retrieves a seat by ID.
     *
     * @param seatId The UUID of the seat
     * @return SeatDTO
     */
    SeatDTO getSeatById(@NotNull UUID seatId);

    /**
     * Retrieves seats by room ID using projection.
     *
     * @param roomId The UUID of the room
     * @return List of SeatProjection
     */
    List<SeatProjection> getSeatsByRoomId(@NotNull UUID roomId);
}