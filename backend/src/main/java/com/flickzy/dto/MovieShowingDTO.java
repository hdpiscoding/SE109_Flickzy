package com.flickzy.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MovieShowingDTO {
    private UUID id;
    private MovieDTO movie;
    private LocalDate startDate;
    private LocalDate endDate;
}
