package com.flickzy.controller;

import com.flickzy.base.BaseController;
import com.flickzy.dto.PaginatedResponse;
import com.flickzy.dto.SeatTypeDTO;
import com.flickzy.service.interfaces.SeatTypeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

/**
 * REST controller for managing seat types.
 */
@RestController
@RequestMapping("/api/v1/seat-types")
@RequiredArgsConstructor
public class SeatTypeController extends BaseController {

    private final SeatTypeService seatTypeService;

    /**
     * Retrieves all seat types with pagination.
     *
     * @param page  The page number (optional, defaults to 1)
     * @param limit The number of items per page (optional, defaults to 10)
     * @return PaginatedResponse of SeatTypeDTOs
     */
    @GetMapping
    public ResponseEntity<Object> getAllSeatTypes(
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer limit) {
        PaginatedResponse<SeatTypeDTO> seatTypes = seatTypeService.getAllSeatTypes(page, limit);
        return buildResponse(seatTypes, HttpStatus.OK, "Seat types retrieved successfully");
    }

    /**
     * Retrieves a seat type by ID.
     *
     * @param seatTypeId The UUID of the seat type
     * @return SeatTypeDTO
     */
    @GetMapping("/{seatTypeId}")
    public ResponseEntity<Object> getSeatTypeById(@PathVariable UUID seatTypeId) {
        SeatTypeDTO seatType = seatTypeService.getSeatTypeById(seatTypeId);
        return buildResponse(seatType, HttpStatus.OK, "Seat type retrieved successfully");
    }

    /**
     * Creates a new seat type (admin only).
     *
     * @param seatTypeDTO The DTO containing seat type details
     * @return Created SeatTypeDTO
     */
    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping
    public ResponseEntity<Object> createSeatType(@Valid @RequestBody SeatTypeDTO seatTypeDTO) {
        SeatTypeDTO createdSeatType = seatTypeService.createSeatType(seatTypeDTO);
        return buildResponse(createdSeatType, HttpStatus.CREATED, "Seat type created successfully");
    }

    /**
     * Updates an existing seat type (admin only).
     *
     * @param seatTypeId  The UUID of the seat type
     * @param seatTypeDTO The DTO containing updated details
     * @return Updated SeatTypeDTO
     */
    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/{seatTypeId}")
    public ResponseEntity<Object> updateSeatType(@PathVariable UUID seatTypeId, @Valid @RequestBody SeatTypeDTO seatTypeDTO) {
        SeatTypeDTO updatedSeatType = seatTypeService.updateSeatType(seatTypeId, seatTypeDTO);
        return buildResponse(updatedSeatType, HttpStatus.OK, "Seat type updated successfully");
    }

    /**
     * Deletes a seat type by ID (admin only).
     *
     * @param seatTypeId The UUID of the seat type
     * @return Success response
     */
    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/{seatTypeId}")
    public ResponseEntity<Object> deleteSeatType(@PathVariable UUID seatTypeId) {
        seatTypeService.deleteSeatType(seatTypeId);
        return buildResponse(null, HttpStatus.OK, "Seat type deleted successfully");
    }
}