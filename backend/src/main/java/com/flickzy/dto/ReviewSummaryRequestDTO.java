package com.flickzy.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewSummaryRequestDTO {
    @NotNull(message = "Movie ID is required")
    private UUID movieId;
}