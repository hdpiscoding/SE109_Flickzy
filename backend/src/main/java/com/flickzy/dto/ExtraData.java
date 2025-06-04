package com.flickzy.dto;

import lombok.Data;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

@Data
public class ExtraData {
    private String scheduleId;
    private String momoID;
    private List<SeatInfo> seats;
    private List<SnackInfo> snacks;

    @Data
    public static class SeatInfo {
        private String seatId;
        private Double price;
        private String name;
        private Integer row;
        private Integer column;
          @JsonProperty("roomId")
        private String room_id;
        @JsonProperty("seatTypeId")
        private String seat_type_id;
    }

    @Data
    public static class SnackInfo {
        private String snackId;
        private Double price;
        private Integer quantity;
        private String description;
        private String name;
        @JsonProperty("brandId")
        private String brand_id;
    }
}