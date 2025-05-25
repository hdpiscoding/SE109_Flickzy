package com.flickzy.dto;

import lombok.Data;
import java.util.List;
import java.util.UUID;

@Data
public class BookingRequestDTO {
    private UUID scheduleId;
    private List<BookingInfo> bookingInfo;

    @Data
    public static class BookingInfo {
        private UUID seatId;
        private Double price;
    }
}