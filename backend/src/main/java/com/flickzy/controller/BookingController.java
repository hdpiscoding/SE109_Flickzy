package com.flickzy.controller;

import com.flickzy.base.BaseController;
import com.flickzy.dto.BookingRequestDTO;
import com.flickzy.dto.BookingResponseDTO;
import com.flickzy.dto.BookingSeatResponseDTO;
import com.flickzy.entity.Users;
import com.flickzy.repository.UserRepository;
import com.flickzy.service.interfaces.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class BookingController extends BaseController {
    private final BookingService bookingService;
    private final UserRepository userRepository;

    @GetMapping("/bookings/me")
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    public ResponseEntity<Object> getBookingHistory(Authentication authentication) {
        String email = authentication.getName();
        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found for email: " + email));
        UUID userId = user.getId();
        List<BookingResponseDTO> bookings = bookingService.getBookingHistory(userId);
        return buildResponse(bookings, HttpStatus.OK, "Booking history retrieved successfully");
    }
@GetMapping("/booking-by-schedule/{id}")
public ResponseEntity<Object> getBookedSeatIdsByScheduleId(@PathVariable UUID id) {
    List<BookingSeatResponseDTO> seatIds = bookingService.getBookedSeatIdsByScheduleId(id);
    return buildResponse(seatIds, HttpStatus.OK, "Booked seatIds retrieved successfully");
}
    @PostMapping("/booking")
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    public ResponseEntity<Object> addBooking(
            @Valid @RequestBody BookingRequestDTO bookingRequestDTO,
            Authentication authentication) {
        String email = authentication.getName();
        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found for email: " + email));
        UUID userId = user.getId();
        BookingResponseDTO response = bookingService.addBooking(bookingRequestDTO, userId);
        return buildResponse(response, HttpStatus.CREATED, "Booking added successfully");
    }
}