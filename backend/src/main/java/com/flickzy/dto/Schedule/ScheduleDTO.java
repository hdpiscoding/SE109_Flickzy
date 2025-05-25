package com.flickzy.dto.Schedule;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleDTO {
    private UUID scheduleId;

    @NotNull(message = "Movie ID is required")
    private UUID movieId;

    @NotNull(message = "Room ID is required")
    private UUID roomId;

    @NotNull(message = "Schedule date is required")
    private LocalDate scheduleDate;

    @NotNull(message = "Start time is required")
    private LocalTime scheduleStart;

    @NotNull(message = "End time is required")
    private LocalTime scheduleEnd;

    @NotNull(message = "Schedule type ID is required")
    private UUID typeId;
}