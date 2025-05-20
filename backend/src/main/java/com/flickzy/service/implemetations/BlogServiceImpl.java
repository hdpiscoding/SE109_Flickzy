package com.flickzy.service.implemetations;

import com.flickzy.dto.Blog.BlogDTO;
import com.flickzy.dto.Blog.BlogFilter;
import com.flickzy.dto.PaginatedResponse;
import com.flickzy.entity.BlogCategories;
import com.flickzy.entity.Blogs;
import com.flickzy.entity.Users;
import com.flickzy.mapper.BlogMapper;
import com.flickzy.repository.BlogCategoriesRepository;
import com.flickzy.repository.BlogRepository;
import com.flickzy.repository.UserRepository;
import com.flickzy.service.interfaces.BlogService;
import com.flickzy.specification.BlogSpecification;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class BlogServiceImpl implements BlogService {
    private final BlogRepository blogRepository;
    private final BlogCategoriesRepository blogCategoriesRepository;
    private final UserRepository userRepository;
    private final BlogMapper blogMapper;

    @Override
    public BlogDTO createBlog(BlogDTO blogDTO) {
        // Lấy thông tin người dùng từ SecurityContext
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User not found!"));

        // Tìm danh mục
        BlogCategories category = blogCategoriesRepository.findById(blogDTO.getCategoryId())
                .orElseThrow(() -> new EntityNotFoundException("Blog category not found!"));

        Blogs blog = Blogs.builder()
                .title(blogDTO.getTitle())
                .content(blogDTO.getContent())
                .description(blogDTO.getDescription())
                .cover(blogDTO.getCover())
                .timeToRead(blogDTO.getTimeToRead())
                .views(0) // Mặc định views = 0
                .category(category)
                .user(user)
                .build();

        return blogMapper.toDto(blogRepository.save(blog));
    }

    @Override
    public BlogDTO updateBlog(UUID id, BlogDTO blogDTO) {
        Blogs blog = blogRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Blog not found!"));

        if (blogDTO.getTitle() != null) {
            blog.setTitle(blogDTO.getTitle());
        }
        if (blogDTO.getContent() != null) {
            blog.setContent(blogDTO.getContent());
        }
        if (blogDTO.getDescription() != null) {
            blog.setDescription(blogDTO.getDescription());
        }
        if (blogDTO.getCover() != null) {
            blog.setCover(blogDTO.getCover());
        }
        if (blogDTO.getTimeToRead() != null) {
            blog.setTimeToRead(blogDTO.getTimeToRead());
        }
        if (blogDTO.getCategoryId() != null) {
            BlogCategories category = blogCategoriesRepository.findById(blogDTO.getCategoryId())
                    .orElseThrow(() -> new EntityNotFoundException("Blog category not found!"));
            blog.setCategory(category);
        }

        return blogMapper.toDto(blogRepository.save(blog));
    }

    @Override
    public void deleteBlog(UUID id) {
        Blogs blog = blogRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Blog not found!"));
        blogRepository.delete(blog);
    }

    @Override
    public PaginatedResponse<BlogDTO> getAllBlogs(BlogFilter filters) {
        int page = filters.getPage() == null ? 1 : filters.getPage();
        int limit = filters.getLimit() == null ? 10 : filters.getLimit();
        Specification<Blogs> spec = Specification.where(null);

        if (filters.getCategoryId() != null) {
            spec = spec.and(BlogSpecification.hasCategory(filters.getCategoryId()));
        }
        if (filters.getTop() != null && filters.getTop() > 0) {
            spec = spec.and(BlogSpecification.orderByViewsDesc());
        }

        PageRequest pageRequest = PageRequest.of(page - 1, filters.getTop() != null ? filters.getTop() : limit);
        Page<Blogs> blogs = blogRepository.findAll(spec, pageRequest);

        List<BlogDTO> blogDTOs = blogMapper.toDtoList(blogs.getContent())
                .stream()
                .map(dto -> BlogDTO.builder()
                        .id(dto.getId())
                        .cover(dto.getCover())
                        .views(dto.getViews())
                        .title(dto.getTitle())
                        .description(dto.getDescription())
                        .build())
                .toList();

        return new PaginatedResponse<>(
                blogDTOs,
                blogs.getNumber() + 1,
                blogs.getSize(),
                blogs.getTotalElements(),
                blogs.getTotalPages(),
                blogs.isLast()
        );
    }

    @Override
    public BlogDTO getBlogDetail(UUID id) {
        Blogs blog = blogRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Blog not found!"));
        return blogMapper.toDto(blog);
    }
}