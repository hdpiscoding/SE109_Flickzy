package com.flickzy.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

/**
 * Data Transfer Object for Room operations.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoomDTO {

    UUID roomId;

  
    UUID cinemaId;


    String roomName;

    String roomType;
    boolean isDelete;

    @Min(value = 1, message = "Width must be at least 1")
    int width;

    @Min(value = 1, message = "Height must be at least 1")
    int height;
}