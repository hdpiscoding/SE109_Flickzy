package com.flickzy.dto;

import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserDTO {
    @Size(max = 100, message = "Full name must not exceed 100 characters")
    private String fullname;

    private String avatar;

    @Past(message = "Birthday must be in the past")
    private LocalDate birthday;

    private Boolean gender;

    @Size(max = 20, message = "Phone number must not exceed 20 characters")
    private String phone;
}