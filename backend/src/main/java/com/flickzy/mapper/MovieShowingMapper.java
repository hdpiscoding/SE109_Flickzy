package com.flickzy.mapper;

import com.flickzy.base.BaseMapper;
import com.flickzy.dto.MovieShowingDTO;
import com.flickzy.entity.MovieShowing;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class MovieShowingMapper implements BaseMapper<MovieShowing, MovieShowingDTO> {
    private final ModelMapper modelMapper;

    @Override
    public MovieShowingDTO toDto(MovieShowing entity) {
        return modelMapper.map(entity, MovieShowingDTO.class);
    }

    @Override
    public MovieShowing toEntity(MovieShowingDTO dto) {
        return modelMapper.map(dto, MovieShowing.class);
    }

    @Override
    public List<MovieShowingDTO> toDtoList(List<MovieShowing> entities) {
        return entities.stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public List<MovieShowing> toEntityList(List<MovieShowingDTO> dtos) {
        return dtos.stream().map(this::toEntity).collect(Collectors.toList());
    }

    @Override
    public Set<MovieShowingDTO> toDtoSet(Set<MovieShowing> entities) {
        return entities.stream().map(this::toDto).collect(Collectors.toSet());
    }

    @Override
    public Set<MovieShowing> toEntitySet(Set<MovieShowingDTO> dtos) {
        return dtos.stream().map(this::toEntity).collect(Collectors.toSet());
    }
}
