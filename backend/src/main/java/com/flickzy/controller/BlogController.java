package com.flickzy.controller;

import com.flickzy.base.BaseController;
import com.flickzy.dto.Blog.BlogDTO;
import com.flickzy.dto.Blog.BlogFilter;
import com.flickzy.service.interfaces.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class BlogController extends BaseController {
    private final BlogService blogService;

    @GetMapping("/blogs")
    public ResponseEntity<Object> getAllBlogs(@RequestBody(required = false) BlogFilter filters) {
        return buildResponse(blogService.getAllBlogs(filters != null ? filters : new BlogFilter()), HttpStatus.OK, "Blogs retrieved successfully");
    }

    @GetMapping("/blog/{id}")
    public ResponseEntity<Object> getBlogDetail(@PathVariable UUID id) {
        return buildResponse(blogService.getBlogDetail(id), HttpStatus.OK, "Blog retrieved successfully");
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/blog")
    public ResponseEntity<Object> createBlog(@RequestBody BlogDTO blogDTO) {
        return buildResponse(blogService.createBlog(blogDTO), HttpStatus.CREATED, "Blog created successfully");
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/blog/{id}")
    public ResponseEntity<Object> updateBlog(@PathVariable UUID id, @RequestBody BlogDTO blogDTO) {
        return buildResponse(blogService.updateBlog(id, blogDTO), HttpStatus.OK, "Blog updated successfully");
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/blog/{id}")
    public ResponseEntity<Object> deleteBlog(@PathVariable UUID id) {
        blogService.deleteBlog(id);
        return buildResponse(null, HttpStatus.OK, "Blog deleted successfully");
    }
}