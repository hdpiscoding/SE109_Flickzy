package com.flickzy.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CinemaDTO {
    private UUID id;

    private String cinemaName;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private UUID brandId;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String cinemaAddress;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String province;
}