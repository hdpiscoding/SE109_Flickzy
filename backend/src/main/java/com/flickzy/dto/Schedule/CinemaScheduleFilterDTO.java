package com.flickzy.dto.Schedule;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CinemaScheduleFilterDTO {
    @NotBlank(message = "Cinema ID or 'All' is required")
    private String cinemaId;

    @NotNull(message = "Date is required")
    private LocalDate date;

    private UUID typeId;

}