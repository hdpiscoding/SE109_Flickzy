package com.flickzy.dto.filters;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MovieFilter {
    private Integer page;
    private Integer limit;
    private UUID genres;
    private Boolean isShowing;
    private String name;
    private Integer yearRelease;
}
