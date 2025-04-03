package com.flickzy.controller;

import com.flickzy.entity.CinemaBrand;
import com.flickzy.service.cinemaBrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/brands")
public class cinemaBrandController {
    @Autowired
    private cinemaBrandService cinemaBrandService;

    @GetMapping
    public List<CinemaBrand> getAllCinemaBrands() {
        return cinemaBrandService.getAllCinemaBrands();
    }

    @GetMapping("/{id}")
    public Optional<CinemaBrand> getCinemaBrandById(@PathVariable UUID id) {
        return cinemaBrandService.getCinemaBrandById(id);
    }

    @PostMapping
    public CinemaBrand createCinemaBrand(@RequestBody CinemaBrand cinemaBrand) {
        return cinemaBrandService.createCinemaBrand(cinemaBrand);
    }

    @PutMapping("/{id}")
    public CinemaBrand updateCinemaBrand(@PathVariable UUID id, @RequestBody CinemaBrand cinemaBrand) {
        return cinemaBrandService.updateCinemaBrand(id, cinemaBrand);
    }

    @DeleteMapping("/{id}")
    public void deleteCinemaBrand(@PathVariable UUID id) {
        cinemaBrandService.deleteCinemaBrand(id);
    }
}