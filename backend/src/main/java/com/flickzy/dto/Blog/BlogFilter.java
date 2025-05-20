package com.flickzy.dto.Blog;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BlogFilter {
    private UUID categoryId;
    private Integer top;
    private Integer page; // Thêm page
    private Integer limit; // Thêm limit
}