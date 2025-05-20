package com.flickzy.mapper;

import com.flickzy.base.BaseMapper;
import com.flickzy.dto.Blog.BlogDTO;
import com.flickzy.entity.Blogs;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class BlogMapper implements BaseMapper<Blogs, BlogDTO> {
    private final ModelMapper modelMapper;

    @Override
    public BlogDTO toDto(Blogs entity) {
        BlogDTO dto = modelMapper.map(entity, BlogDTO.class);
        if (entity.getCategory() != null) {
            dto.setCategoryName(entity.getCategory().getCategory());
        }
        if (entity.getUser() != null) {
            dto.setAuthorName(entity.getUser().getFullname());
        }
        return dto;
    }

    @Override
    public Blogs toEntity(BlogDTO dto) {
        return modelMapper.map(dto, Blogs.class);
    }

    @Override
    public List<BlogDTO> toDtoList(List<Blogs> entities) {
        return entities.stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public List<Blogs> toEntityList(List<BlogDTO> dtos) {
        return dtos.stream().map(this::toEntity).collect(Collectors.toList());
    }

    @Override
    public Set<BlogDTO> toDtoSet(Set<Blogs> entities) {
        return entities.stream().map(this::toDto).collect(Collectors.toSet());
    }

    @Override
    public Set<Blogs> toEntitySet(Set<BlogDTO> dtos) {
        return dtos.stream().map(this::toEntity).collect(Collectors.toSet());
    }
}