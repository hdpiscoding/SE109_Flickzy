package com.flickzy.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

/**
 * Data Transfer Object for filtering cinemas by brand IDs.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CinemaFilterDTO {

    @NotEmpty(message = "Brand IDs list cannot be empty")
    List<String> brandIds;
}