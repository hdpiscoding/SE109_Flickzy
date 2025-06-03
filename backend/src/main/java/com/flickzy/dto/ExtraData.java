package com.flickzy.dto;

import lombok.Data;
import java.util.List;

@Data
public class ExtraData {
    private String scheduleId;
    private List<BookingInfo> bookingInfo;

    @Data
    public static class BookingInfo {
        private String seatId;
        private Double price;
    }
}