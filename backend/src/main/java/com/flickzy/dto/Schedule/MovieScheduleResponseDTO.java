package com.flickzy.dto.Schedule;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovieScheduleResponseDTO {
    private String brandName;
    private String avatar;
    private List<CinemaDTO> cinemas;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CinemaDTO {
        private UUID cinemaId;
        private String cinemaName;
        private String cinemaAddress;
        private String province;
        private List<ScheduleDTO> schedules;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ScheduleDTO {
        private UUID scheduleId;
        private LocalDate scheduleDate;
        private LocalTime scheduleStart;
        private LocalTime scheduleEnd;
        private UUID roomId;
        private String roomType;
        private String typeName;
    }
}