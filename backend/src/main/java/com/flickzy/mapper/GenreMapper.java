package com.flickzy.mapper;

import com.flickzy.base.BaseMapper;
import com.flickzy.dto.GenreDTO;
import com.flickzy.entity.Genres;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class GenreMapper implements BaseMapper<Genres, GenreDTO> {
    private final ModelMapper modelMapper;

    @Override
    public GenreDTO toDto(Genres entity) {
        return modelMapper.map(entity, GenreDTO.class);
    }

    @Override
    public Genres toEntity(GenreDTO dto) {
        return modelMapper.map(dto, Genres.class);
    }

    @Override
    public List<GenreDTO> toDtoList(List<Genres> entities) {
        return entities.stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public List<Genres> toEntityList(List<GenreDTO> dtos) {
        return dtos.stream().map(this::toEntity).collect(Collectors.toList());
    }

    @Override
    public Set<GenreDTO> toDtoSet(Set<Genres> entities) {
        return entities.stream().map(this::toDto).collect(Collectors.toSet());
    }

    @Override
    public Set<Genres> toEntitySet(Set<GenreDTO> dtos) {
        return dtos.stream().map(this::toEntity).collect(Collectors.toSet());
    }
}
