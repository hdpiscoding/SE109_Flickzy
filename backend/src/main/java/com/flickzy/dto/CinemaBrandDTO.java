package com.flickzy.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

/**
 * Data Transfer Object for CinemaBrand operations.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CinemaBrandDTO {

    UUID id;

    @NotBlank(message = "Brand name is required")
    String brandName;

    String avatar;

    String cover;

    String description;
    String intro;
    private Integer cinemaCount;
}