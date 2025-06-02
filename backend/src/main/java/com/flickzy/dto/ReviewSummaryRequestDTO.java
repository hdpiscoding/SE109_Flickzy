package com.flickzy.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewSummaryRequestDTO {
    @NotNull(message = "Movie ID is required")
    private UUID movieId;

    @NotEmpty(message = "Reviews cannot be empty")
    private List<ReviewDTO> reviews;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ReviewDTO {
        @NotBlank(message = "Review content is required")
        @Size(max = 1000, message = "Review content cannot exceed 1000 characters")
        private String content;

        @NotNull(message = "Star rating is required")
        @Min(value = 0, message = "Star rating must be at least 0")
        @Max(value = 5, message = "Star rating cannot exceed 5")
        private Integer star;
    }
}