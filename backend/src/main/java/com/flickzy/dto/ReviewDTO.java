package com.flickzy.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.flickzy.dto.User.UserResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReviewDTO {
    private UUID id;
    private String content;
    private Integer star;
    private UserResponse user;
}
