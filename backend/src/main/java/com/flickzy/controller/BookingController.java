package com.flickzy.controller;

import com.flickzy.dto.User.ChangePasswordRequest;
import com.flickzy.dto.User.UserResponse;
import com.flickzy.entity.Booking;
import com.flickzy.entity.Users;
import com.flickzy.service.BookingService;
import com.flickzy.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/booking")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

    @Autowired
    private BookingService bookingService;


    @GetMapping("/{id}")
    public ResponseEntity<List<Booking>> getBookingHistory(@PathVariable UUID id) {

        return ResponseEntity.ok(bookingService.getBookingHistory(id));

    }


    @PostMapping
    public ResponseEntity<?> booking(
             @RequestBody Booking bookingBody) {


        return ResponseEntity.ok( bookingService.booking(  bookingBody));
    }

}
