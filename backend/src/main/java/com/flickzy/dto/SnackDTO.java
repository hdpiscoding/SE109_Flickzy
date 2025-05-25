package com.flickzy.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

/**
 * Data Transfer Object for Snack operations.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SnackDTO {

    UUID id;

   
    String name;

    String description;

    String image;

  
    @Min(value = 0, message = "Price cannot be negative")
    Integer price;
    @NotNull(message = "Brand ID cannot be null")
    UUID brandId;


    Boolean isDelete;

    Boolean isAvailable;
}