package com.flickzy.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingResponseDTO {
    private UUID bookingId;
    private LocalDateTime createdAt;
    private Integer seatStatus;
    private Double price;
    private MovieInfoDTO movieInfo;
    private ScheduleInfoDTO scheduleInfo;
    private CinemaInfoDTO cinemaInfo;
    private SeatInfoDTO seat;

    // Add these fields for JSON seats/snacks
    private String seats;
    private String snacks;

    // Add getters and setters for seats and snacks
    public String getSeats() {
        return seats;
    }
    public void setSeats(String seats) {
        this.seats = seats;
    }
    public String getSnacks() {
        return snacks;
    }
    public void setSnacks(String snacks) {
        this.snacks = snacks;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MovieInfoDTO {
        private UUID movieId;
        private String movieName;
        private String ageRating;
        private String moviePoster;
        private String genresName;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ScheduleInfoDTO {
        private UUID scheduleId;
        private LocalDate scheduleDate;
        private LocalTime scheduleStart;
        private LocalTime scheduleEnd;
        private UUID roomId;
        private String roomType;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CinemaInfoDTO {
        private UUID cinemaId;
        private String cinemaName;
        private String cinemaAddress;
        private String province;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SeatInfoDTO {
        private UUID seatId;
        private String name;
        private String seatType;
        private Integer row;
        private Integer column;
        private Integer price;
    }
}