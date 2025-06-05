package com.flickzy.dto.Schedule;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Data
public class ScheduleSimpleDTO {
    private UUID scheduleId;
    private UUID movieId;
    private UUID roomId;
    private LocalDate scheduleDate;
    private LocalTime scheduleStart;
    private LocalTime scheduleEnd;
    private UUID typeId;
}
