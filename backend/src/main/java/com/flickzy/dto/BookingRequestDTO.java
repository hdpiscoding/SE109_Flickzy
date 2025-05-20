package com.flickzy.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingRequestDTO {
    @NotNull(message = "Schedule ID is required")
    private UUID scheduleId;

    @NotNull(message = "Seat ID is required")
    private UUID seatId;

    @NotNull(message = "Price is required")
    private Double price;
}