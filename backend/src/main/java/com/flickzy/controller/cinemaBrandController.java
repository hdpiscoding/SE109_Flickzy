package com.flickzy.controller;

import com.flickzy.base.BaseController;
import com.flickzy.dto.CinemaBrandDTO;
import com.flickzy.dto.PaginatedResponse;
import com.flickzy.service.interfaces.CinemaBrandService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/api/v1/brands")
@RequiredArgsConstructor
public class CinemaBrandController extends BaseController {

    private final CinemaBrandService cinemaBrandService;

    @GetMapping
    public ResponseEntity<Object> getAllCinemaBrands() {
      PaginatedResponse<CinemaBrandDTO> brands = cinemaBrandService.getAllCinemaBrands(1,10); //
        return buildResponse(brands, HttpStatus.OK, "Cinema brands retrieved successfully");
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getCinemaBrandById(@PathVariable UUID id) {
        CinemaBrandDTO brand = cinemaBrandService.getCinemaBrandById(id);
        return buildResponse(brand, HttpStatus.OK, "Cinema brand retrieved successfully");
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping
    public ResponseEntity<Object> createCinemaBrand( @RequestBody CinemaBrandDTO cinemaBrandDTO) {
        CinemaBrandDTO createdBrand = cinemaBrandService.createCinemaBrand(cinemaBrandDTO);
        return buildResponse(createdBrand, HttpStatus.CREATED, "Cinema brand created successfully");
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateCinemaBrand(@PathVariable UUID id, @Valid @RequestBody CinemaBrandDTO cinemaBrandDTO) {
        CinemaBrandDTO updatedBrand = cinemaBrandService.updateCinemaBrand(id, cinemaBrandDTO);
        return buildResponse(updatedBrand, HttpStatus.OK, "Cinema brand updated successfully");
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteCinemaBrand(@PathVariable UUID id) {
        cinemaBrandService.deleteCinemaBrand(id);
        return buildResponse(null, HttpStatus.OK, "Cinema brand deleted successfully");
    }
}