package com.flickzy.controller;

import com.flickzy.base.BaseController;
import com.flickzy.entity.CinemaBrand;
import com.flickzy.service.cinemaBrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/brands")
public class cinemaBrandController extends BaseController {
    @Autowired
    private cinemaBrandService cinemaBrandService;

    @GetMapping
    public ResponseEntity<Object> getAllCinemaBrands() {
        return buildResponse(cinemaBrandService.getAllCinemaBrands(), HttpStatus.OK, "Cinema brands retrieved successfully");
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getCinemaBrandById(@PathVariable UUID id) {
        return buildResponse(cinemaBrandService.getCinemaBrandById(id), HttpStatus.OK, "Cinema brand retrieved successfully");
    }

    @PostMapping
    public ResponseEntity<Object> createCinemaBrand(@RequestBody CinemaBrand cinemaBrand) {
        return buildResponse(cinemaBrandService.createCinemaBrand(cinemaBrand), HttpStatus.CREATED, "Cinema brand created successfully");
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateCinemaBrand(@PathVariable UUID id, @RequestBody CinemaBrand cinemaBrand) {
        return buildResponse(cinemaBrandService.updateCinemaBrand(id, cinemaBrand), HttpStatus.OK, "Cinema brand updated successfully");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteCinemaBrand(@PathVariable UUID id) {
        cinemaBrandService.deleteCinemaBrand(id);
        return buildResponse(null, HttpStatus.OK, "Cinema brand deleted successfully");
    }
}