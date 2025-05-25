package com.flickzy.service.interfaces;

import com.flickzy.dto.RoomDTO;
import com.flickzy.dto.PaginatedResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

/**
 * Service interface for managing room entities.
 */
public interface RoomService {

    /**
     * Creates a new room.
     *
     * @param roomDTO The DTO containing room details
     * @return Created RoomDTO
     */
    RoomDTO createRoom(@Valid RoomDTO roomDTO);

    /**
     * Updates an existing room.
     *
     * @param roomId  The UUID of the room
     * @param roomDTO The DTO containing updated details
     * @return Updated RoomDTO
     */
    RoomDTO updateRoom(@NotNull UUID roomId, @Valid RoomDTO roomDTO);

    /**
     * Deletes a room by ID.
     *
     * @param roomId The UUID of the room
     */
    void deleteRoom(@NotNull UUID roomId);

    /**
     * Retrieves all rooms with pagination.
     *
     * @param page  The page number (optional, defaults to 1)
     * @param limit The number of items per page (optional, defaults to 10)
     * @return PaginatedResponse containing RoomDTOs
     */
    PaginatedResponse<RoomDTO> getAllRooms(Integer page, Integer limit);

    /**
     * Retrieves a room by ID.
     *
     * @param roomId The UUID of the room
     * @return RoomDTO
     */
    RoomDTO getRoomById(@NotNull UUID roomId);
}