package com.flickzy.controller;

import com.flickzy.base.BaseController;
import com.flickzy.dto.PaginatedResponse;
import com.flickzy.dto.SeatDTO;
import com.flickzy.projection.SeatProjection;
import com.flickzy.service.interfaces.SeatsService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * REST controller for managing seats.
 */
@RestController
@RequestMapping("/api/v1/seats")
@RequiredArgsConstructor
public class SeatsController extends BaseController {

    private final SeatsService seatService;

    /**
     * Retrieves all seats with pagination.
     *
     * @param page  The page number (optional, defaults to 1)
     * @param limit The number of items per page (optional, defaults to 10)
     * @return PaginatedResponse of SeatDTOs
     */
    @GetMapping
    public ResponseEntity<Object> getAllSeats(
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer limit) {
        PaginatedResponse<SeatDTO> seats = seatService.getAllSeats(page, limit);
        return buildResponse(seats, HttpStatus.OK, "Seats retrieved successfully");
    }

    /**
     * Retrieves a seat by ID.
     *
     * @param seatId The UUID of the seat
     * @return SeatDTO
     */
    @GetMapping("/{seatId}")
    public ResponseEntity<Object> getSeatById(@PathVariable UUID seatId) {
        SeatDTO seat = seatService.getSeatById(seatId);
        return buildResponse(seat, HttpStatus.OK, "Seat retrieved successfully");
    }

    /**
     * Retrieves seats by room ID.
     *
     * @param roomId The UUID of the room
     * @return List of SeatProjection
     */
    @GetMapping("/room/{roomId}")
    public ResponseEntity<Object> getSeatsByRoomId(@PathVariable UUID roomId) {
        List<SeatProjection> seats = seatService.getSeatsByRoomId(roomId);
        return buildResponse(seats, HttpStatus.OK, "Seats for room retrieved successfully");
    }

    /**
     * Creates a new seat (admin only).
     *
     * @param seatDTO The DTO containing seat details
     * @return Created SeatDTO
     */
    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping
    public ResponseEntity<Object> createSeat(@Valid @RequestBody SeatDTO seatDTO) {
        SeatDTO createdSeat = seatService.createSeat(seatDTO);
        return buildResponse(createdSeat, HttpStatus.CREATED, "Seat created successfully");
    }

    /**
     * Updates an existing seat (admin only).
     *
     * @param seatId  The UUID of the seat
     * @param seatDTO The DTO containing updated details
     * @return Updated SeatDTO
     */
    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/{seatId}")
    public ResponseEntity<Object> updateSeat(@PathVariable UUID seatId,  @RequestBody SeatDTO seatDTO) {
        SeatDTO updatedSeat = seatService.updateSeat(seatId, seatDTO);
        return buildResponse(updatedSeat, HttpStatus.OK, "Seat updated successfully");
    }

    /**
     * Deletes a seat by ID (admin only).
     *
     * @param seatId The UUID of the seat
     * @return Success response
     */
    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/{seatId}")
    public ResponseEntity<Object> deleteSeat(@PathVariable UUID seatId) {
        seatService.deleteSeat(seatId);
        return buildResponse(null, HttpStatus.OK, "Seat deleted successfully");
    }
}