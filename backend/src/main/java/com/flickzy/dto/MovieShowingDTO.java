package com.flickzy.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
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
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private MovieDTO movie;
    private String name;
    private LocalDate startDate;
    private LocalDate endDate;
}
