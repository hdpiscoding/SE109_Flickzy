package com.flickzy.service.interfaces;

import com.flickzy.dto.Blog.BlogDTO;
import com.flickzy.dto.Blog.BlogFilter;
import com.flickzy.dto.PaginatedResponse;

import java.util.List;
import java.util.UUID;

public interface BlogService {
    BlogDTO createBlog(BlogDTO blogDTO);
    BlogDTO updateBlog(UUID id, BlogDTO blogDTO);
    void deleteBlog(UUID id);
    PaginatedResponse<BlogDTO> getAllBlogs(BlogFilter filters);
    BlogDTO getBlogDetail(UUID id);
}