package com.flickzy.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

/**
 * Data Transfer Object for SeatType operations.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SeatTypeDTO {

    UUID seatTypeId;

 
    String name;

    @Min(value = 1, message = "Width must be at least 1")
    Integer width;

    @Min(value = 1, message = "Height must be at least 1")
    Integer height;

    @Min(value = 0, message = "Price cannot be negative")
    Integer price;

    String description;

    @Size(max = 20, message = "Color must not exceed 20 characters")
    String color;
}