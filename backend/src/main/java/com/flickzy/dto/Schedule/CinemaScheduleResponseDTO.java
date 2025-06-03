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
public class CinemaScheduleResponseDTO {
    private UUID movieId;
    private String movieName;
    private String ageRating;
    private String moviePoster;
    private String genresName;
    private List<ScheduleDetailDTO> schedules;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ScheduleDetailDTO {
        private UUID scheduleId;
        private LocalDate scheduleDate;
        private LocalTime scheduleStart;
        private LocalTime scheduleEnd;
        private UUID roomId;
        private String roomType;
        private String roomName;
        private String typeName;
        private String typeId;

    }
}