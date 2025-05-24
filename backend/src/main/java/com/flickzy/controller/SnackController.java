package com.flickzy.controller;

import com.flickzy.base.BaseController;
import com.flickzy.dto.PaginatedResponse;
import com.flickzy.dto.SnackDTO;
import com.flickzy.dto.SnackStatusDTO;
import com.flickzy.service.interfaces.SnackService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

/**
 * REST controller for managing snacks.
 */
@RestController
@RequestMapping("/api/v1/snacks")
@RequiredArgsConstructor
public class SnackController extends BaseController {

    private final SnackService snackService;

    /**
     * Creates a new snack (admin only).
     *
     * @param snackDTO The DTO containing snack details
     * @return Created SnackDTO
     */
    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping
    public ResponseEntity<Object> createSnack(@Valid @RequestBody SnackDTO snackDTO) {
        SnackDTO createdSnack = snackService.createSnack(snackDTO);
        return buildResponse(createdSnack, HttpStatus.CREATED, "Snack created successfully");
    }

    /**
     * Updates an existing snack (admin only).
     *
     * @param id       The UUID of the snack
     * @param snackDTO The DTO containing updated details
     * @return Updated SnackDTO
     */
    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateSnack(@PathVariable UUID id, @Valid @RequestBody SnackDTO snackDTO) {
        SnackDTO updatedSnack = snackService.updateSnack(id, snackDTO);
        return buildResponse(updatedSnack, HttpStatus.OK, "Snack updated successfully");
    }

    /**
     * Retrieves all available snacks (isDelete = false, isAvailable = true) with pagination.
     *
     * @param page  The page number (optional, defaults to 1)
     * @param limit The number of items per page (optional, defaults to 10)
     * @return PaginatedResponse of SnackDTOs
     */
    @GetMapping("/available/{brandId}")
    public ResponseEntity<Object> getAllAvailableSnacksByBrand(
            @PathVariable UUID brandId,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer limit) {
        PaginatedResponse<SnackDTO> snacks = snackService.getAllAvailableSnacksByBrand(brandId, page, limit);
        return buildResponse(snacks, HttpStatus.OK, "Available snacks by brand retrieved successfully");
    }
    /**
     * Sets the isDelete status of a snack (admin only).
     *
     * @param id           The UUID of the snack
     * @param statusDTO    The DTO containing the isDelete status
     * @return Success response
     */
    @PreAuthorize("hasAuthority('ADMIN')")
    @PatchMapping("/{id}/delete")
    public ResponseEntity<Object> setDeleteStatus(@PathVariable UUID id, @Valid @RequestBody SnackStatusDTO statusDTO) {
        snackService.setDeleteStatus(id, statusDTO);
        return buildResponse(null, HttpStatus.OK, "Snack delete status updated successfully");
    }

    /**
     * Sets the isAvailable status of a snack (admin only).
     *
     * @param id           The UUID of the snack
     * @param statusDTO    The DTO containing the isAvailable status
     * @return Success response
     */
    @PreAuthorize("hasAuthority('ADMIN')")
    @PatchMapping("/{id}/availability")
    public ResponseEntity<Object> setAvailabilityStatus(@PathVariable UUID id, @Valid @RequestBody SnackStatusDTO statusDTO) {
        snackService.setAvailabilityStatus(id, statusDTO);
        return buildResponse(null, HttpStatus.OK, "Snack availability status updated successfully");
    }
}