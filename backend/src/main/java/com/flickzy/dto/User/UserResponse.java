package com.flickzy.dto.User;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.UUID;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {
    private UUID id;
    private String fullname;
    private LocalDate birthday;
    private Boolean gender;
    private String email;
    private String phone;
    private String avatar;
    // getters and setters
}