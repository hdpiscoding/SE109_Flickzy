package com.flickzy.controller;

import com.flickzy.base.BaseController;
import com.flickzy.dto.BookingRequestDTO;
import com.flickzy.dto.BookingResponseDTO;
import com.flickzy.dto.BookingSeatResponseDTO;
import com.flickzy.entity.Users;
import com.flickzy.repository.UserRepository;
import com.flickzy.service.interfaces.BookingService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
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

        // Convert seats/snacks from JSON string to array for response
        ObjectMapper objectMapper = new ObjectMapper();
        List<Object> result = new java.util.ArrayList<>();
        for (BookingResponseDTO booking : bookings) {
            try {
                // Parse seats
                Object seatsArr = null;
                if (booking.getSeats() != null) {
                    seatsArr = objectMapper.readValue(booking.getSeats(), new TypeReference<java.util.List<Object>>() {});
                }
                // Parse snacks
                Object snacksArr = null;
                if (booking.getSnacks() != null) {
                    snacksArr = objectMapper.readValue(booking.getSnacks(), new TypeReference<java.util.List<Object>>() {});
                }
                // Build response map
                java.util.Map<String, Object> bookingMap = new java.util.HashMap<>();
                bookingMap.put("bookingId", booking.getBookingId());
                bookingMap.put("createdAt", booking.getCreatedAt());
                bookingMap.put("seatStatus", booking.getSeatStatus());
                bookingMap.put("price", booking.getPrice());
                bookingMap.put("movieInfo", booking.getMovieInfo());
                bookingMap.put("scheduleInfo", booking.getScheduleInfo());
                bookingMap.put("cinemaInfo", booking.getCinemaInfo());
                bookingMap.put("seats", seatsArr);
                bookingMap.put("snacks", snacksArr);
                 result.add(bookingMap);
            } catch (Exception e) {
                // fallback: trả về như cũ nếu lỗi
                result.add(booking);
            }
        }
        return buildResponse(result, HttpStatus.OK, "Booking history retrieved successfully");
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
        List<BookingResponseDTO> response = bookingService.addBooking(bookingRequestDTO, userId);
        return buildResponse(response, HttpStatus.CREATED, "Booking(s) added successfully");
    }
}