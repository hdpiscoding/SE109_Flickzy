package com.flickzy.controller;

import com.flickzy.entity.Cinemas;
import com.flickzy.service.CinemasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/cinemas")
@CrossOrigin(origins = "*") // Cho phép gọi từ frontend
public class CinemasController {

    @Autowired
    private CinemasService cinemasService;

    // 🟢 Get all cinemas
    @GetMapping
    public ResponseEntity<List<Cinemas>> getAllCinemas() {
        return ResponseEntity.ok(cinemasService.getAllCinemas());
    }

    // 🔍 Get cinema by ID
    @GetMapping("/{id}")
    public ResponseEntity<Cinemas> getCinemaById(@PathVariable UUID id) {
        return ResponseEntity.ok(cinemasService.getCinemaById(id));
    }

    // 🆕 Add new cinema (Admin only)
   @PostMapping
public ResponseEntity<Cinemas> addNewCinema(@RequestParam UUID brandId, @RequestBody Cinemas cinema) {
    return ResponseEntity.ok(cinemasService.addNewCinema(brandId, cinema));
}


    // ✏️ Edit cinema (Admin only)
     @PutMapping("/{id}")
    public ResponseEntity<Cinemas> editCinema(
            @PathVariable UUID id,
            @RequestParam(required = false) UUID brandId, // Thêm brandId để cập nhật nếu cần
            @RequestBody Cinemas updatedCinema) {
        return ResponseEntity.ok(cinemasService.editCinema(id, brandId, updatedCinema));
    }

    // ❌ Delete cinema (Admin only)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCinema(@PathVariable UUID id) {
        cinemasService.deleteCinema(id);
        return ResponseEntity.ok("Cinema deleted successfully");
    }
}
