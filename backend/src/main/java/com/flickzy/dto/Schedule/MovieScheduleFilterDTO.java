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
public class MovieScheduleFilterDTO {
    @NotNull(message = "Movie ID is required")
    private UUID movieId;

    @NotNull(message = "Date is required")
    private LocalDate date;

    @NotBlank(message = "Province is required")
    private String province;
}