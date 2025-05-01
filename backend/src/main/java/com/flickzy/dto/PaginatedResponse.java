package com.flickzy.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PaginatedResponse<T> {
    private List<T> data;
    private int page;
    private int limit;
    private long totalElements;
    private int totalPages;
    private boolean lastPage;
}
