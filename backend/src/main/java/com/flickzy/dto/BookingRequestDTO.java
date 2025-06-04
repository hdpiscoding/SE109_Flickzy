package com.flickzy.dto;

import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class BookingRequestDTO {
    private UUID scheduleId;
    private List<SeatDTO> seats;
    private List<SnackDTO> snacks;
    private UUID userId;
    private String momoID; // Add this field

    @Data
    public static class SeatDTO {
        private UUID seatId;
        private Double price;
        private String name;
        private String row;
        private String column;
        private String room_id;
         // Assuming you want to track the user who booked the seat
        private String seat_type_id;
    }

    @Data
    public static class SnackDTO {
        private UUID snackId;
        private Double price;
        private String description;
        private String name;
        private Integer quantity;
        private String brand_id;
    }
}