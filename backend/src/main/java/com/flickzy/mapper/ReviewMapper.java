package com.flickzy.mapper;

import com.flickzy.base.BaseMapper;
import com.flickzy.dto.ReviewDTO;
import com.flickzy.entity.Reviews;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class ReviewMapper implements BaseMapper<Reviews, ReviewDTO> {
    private final ModelMapper modelMapper;
    @Override
    public ReviewDTO toDto(Reviews entity) {
        return modelMapper.map(entity, ReviewDTO.class);
    }

    @Override
    public Reviews toEntity(ReviewDTO dto) {
        return modelMapper.map(dto, Reviews.class);
    }

    @Override
    public List<ReviewDTO> toDtoList(List<Reviews> entities) {
        return entities.stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public List<Reviews> toEntityList(List<ReviewDTO> dtos) {
        return dtos.stream().map(this::toEntity).collect(Collectors.toList());
    }

    @Override
    public Set<ReviewDTO> toDtoSet(Set<Reviews> entities) {
        return entities.stream().map(this::toDto).collect(Collectors.toSet());
    }

    @Override
    public Set<Reviews> toEntitySet(Set<ReviewDTO> dtos) {
        return dtos.stream().map(this::toEntity).collect(Collectors.toSet());
    }
}
