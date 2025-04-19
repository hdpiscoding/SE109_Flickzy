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
    private int page;
    private int limit;
    private UUID genres;
    private boolean isShowing;
    private String name;
    private int year_release;
}
