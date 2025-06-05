package com.flickzy.dto.Booking;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingNotificationDTO {
    private String movieName;
    private LocalDate scheduleDate;
    private LocalTime scheduleStart;
    private LocalTime scheduleEnd;
    private String roomName;
    private String roomType;
    private List<SeatInfo> seats;
    private List<SnackInfo> snacks;
    private Double totalPrice;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SeatInfo {
        private String seatName;
        private Double price;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SnackInfo {
        private String snackName;
        private Integer quantity;
        private Double price;
    }
}