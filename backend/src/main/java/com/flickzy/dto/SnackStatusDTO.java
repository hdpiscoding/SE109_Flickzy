package com.flickzy.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

/**
 * Data Transfer Object for updating Snack status (isDelete or isAvailable).
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SnackStatusDTO {

    @NotNull(message = "Status is required")
    Boolean status;
}