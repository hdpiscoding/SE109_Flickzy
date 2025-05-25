package com.flickzy.controller;

import com.flickzy.base.BaseController;
import com.flickzy.dto.RoomDTO;
import com.flickzy.dto.PaginatedResponse;
import com.flickzy.service.interfaces.RoomService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

/**
 * REST controller for managing rooms.
 */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/rooms")
@RequiredArgsConstructor
public class RoomController extends BaseController {

    private final RoomService roomService;

    /**
     * Retrieves all rooms with pagination.
     *
     * @param page  The page number (optional, defaults to 1)
     * @param limit The number of items per page (optional, defaults to 10)
     * @return PaginatedResponse of RoomDTOs
     */
    @GetMapping
    public ResponseEntity<Object> getAllRooms(
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer limit) {
        PaginatedResponse<RoomDTO> rooms = roomService.getAllRooms(page, limit);
        return buildResponse(rooms, HttpStatus.OK, "Rooms retrieved successfully");
    }

    /**
     * Retrieves a room by ID.
     *
     * @param roomId The UUID of the room
     * @return RoomDTO
     */
    @GetMapping("/{roomId}")
    public ResponseEntity<Object> getRoomById(@PathVariable UUID roomId) {
        RoomDTO room = roomService.getRoomById(roomId);
        return buildResponse(room, HttpStatus.OK, "Room retrieved successfully");
    }

    /**
     * Creates a new room (admin only).
     *
     * @param roomDTO The DTO containing room details
     * @return Created RoomDTO
     */
    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping
    public ResponseEntity<Object> createRoom(@RequestBody RoomDTO roomDTO) {
        RoomDTO createdRoom = roomService.createRoom(roomDTO);
        return buildResponse(createdRoom, HttpStatus.CREATED, "Room created successfully");
    }

    /**
     * Updates an existing room (admin only).
     *
     * @param roomId  The UUID of the room
     * @param roomDTO The DTO containing updated details
     * @return Updated RoomDTO
     */
    // @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/{roomId}")
    public ResponseEntity<Object> updateRoom(@PathVariable UUID roomId, @RequestBody RoomDTO roomDTO) {
        RoomDTO updatedRoom = roomService.updateRoom(roomId, roomDTO);
        return buildResponse(updatedRoom, HttpStatus.OK, "Room updated successfully");
    }

    /**
     * Deletes a room by ID (admin only).
     *
     * @param roomId The UUID of the room
     * @return Success response
     */
    // @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/{roomId}")
    public ResponseEntity<Object> deleteRoom(@PathVariable UUID roomId) {
        roomService.deleteRoom(roomId);
        return buildResponse(null, HttpStatus.OK, "Room deleted successfully");
    }
}