package com.flickzy.mapper;

import com.flickzy.base.BaseMapper;
import com.flickzy.dto.MovieDTO;
import com.flickzy.entity.Movies;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class MovieMapper implements BaseMapper<Movies, MovieDTO> {
    private final ModelMapper modelMapper;
    @Override
    public MovieDTO toDto(Movies entity) {
        return modelMapper.map(entity, MovieDTO.class);
    }

    @Override
    public Movies toEntity(MovieDTO dto) {
        return modelMapper.map(dto, Movies.class);
    }

    @Override
    public List<MovieDTO> toDtoList(List<Movies> entities) {
        return entities.stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public List<Movies> toEntityList(List<MovieDTO> dtos) {
        return dtos.stream().map(this::toEntity).collect(Collectors.toList());
    }

    @Override
    public Set<MovieDTO> toDtoSet(Set<Movies> entities) {
        return entities.stream().map(this::toDto).collect(Collectors.toSet());
    }

    @Override
    public Set<Movies> toEntitySet(Set<MovieDTO> dtos) {
        return dtos.stream().map(this::toEntity).collect(Collectors.toSet());
    }
}
