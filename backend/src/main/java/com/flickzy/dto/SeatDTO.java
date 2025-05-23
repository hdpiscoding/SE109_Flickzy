package com.flickzy.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

/**
 * Data Transfer Object for Seat operations.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SeatDTO {

    UUID seatId;

    UUID seatTypeId;

    UUID roomId;

    @Min(value = 1, message = "Row must be at least 1")
    Integer row;

    @Min(value = 1, message = "Column must be at least 1")
    Integer column;

    @Min(value = 0, message = "Price cannot be negative")
    Integer price;

    String name;
}