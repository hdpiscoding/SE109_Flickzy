package com.flickzy.controller;

import com.flickzy.entity.Seats;
import com.flickzy.projection.SeatProjection;
import com.flickzy.service.SeatsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/seats")
@CrossOrigin(origins ={ "http://localhost:3000","http://localhost:3001", "http://localhost:3002","http://localhost:3003","http://localhost:3004","http://localhost:3005"}) 
@RequiredArgsConstructor
public class SeatsController {

    private final SeatsService seatsService;

    @GetMapping
    public ResponseEntity<List<Seats>> getAllSeats() {
        return ResponseEntity.ok(seatsService.getAllSeats());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Seats> getSeatById(@PathVariable UUID id) {
        return ResponseEntity.ok(seatsService.getSeatById(id));
    }

    @PostMapping
    public ResponseEntity<Seats> createSeat(@RequestBody Seats seat) {
        return ResponseEntity.ok(seatsService.createSeat(seat));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Seats> updateSeat(@PathVariable UUID id, @RequestBody Seats seat) {
        return ResponseEntity.ok(seatsService.updateSeat(id, seat));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSeat(@PathVariable UUID id) {
        seatsService.deleteSeat(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/room/{roomId}")
public ResponseEntity<List<SeatProjection>> getSeatsByRoomId(@PathVariable UUID roomId) {
    return ResponseEntity.ok(seatsService.getSeatsByRoomId(roomId));
}
}