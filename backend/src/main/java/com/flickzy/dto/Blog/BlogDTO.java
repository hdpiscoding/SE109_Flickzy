package com.flickzy.dto.Blog;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BlogDTO {
    private Long id;
    private String title;
    private String content;
    private String description;
    private String cover;
    private Integer timeToRead;
    private Integer views;
    private UUID categoryId; // Thêm categoryId
    private String categoryName;
    private String authorName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}