package com.flickzy.controller;

import com.flickzy.entity.SeatType;
import com.flickzy.service.SeatTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/seat-types")
@RequiredArgsConstructor
@CrossOrigin(origins ={ "http://localhost:3000","http://localhost:3001", "http://localhost:3002","http://localhost:3003","http://localhost:3004","http://localhost:3005"}) 

public class SeatTypeController {
    private final SeatTypeService seatTypeService;

    @GetMapping
    public List<SeatType> getAllSeatTypes() {
        return seatTypeService.getAllSeatTypes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SeatType> getSeatTypeById(@PathVariable UUID id) {
        return seatTypeService.getSeatTypeById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public SeatType createSeatType(@RequestBody SeatType seatType) {
        return seatTypeService.createSeatType(seatType);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SeatType> updateSeatType(@PathVariable UUID id, @RequestBody SeatType seatType) {
        try {
            return ResponseEntity.ok(seatTypeService.updateSeatType(id, seatType));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSeatType(@PathVariable UUID id) {
        seatTypeService.deleteSeatType(id);
        return ResponseEntity.noContent().build();
    }
}
