package com.flickzy.mapper;

import com.flickzy.base.BaseMapper;
import com.flickzy.dto.CinemaDTO;
import com.flickzy.entity.Cinemas;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class CinemasMapper implements BaseMapper<Cinemas, CinemaDTO> {
    private final ModelMapper modelMapper;

    @Override
    public CinemaDTO toDto(Cinemas entity) {
        CinemaDTO dto = modelMapper.map(entity, CinemaDTO.class);
     
        return dto;
    }

    @Override
    public Cinemas toEntity(CinemaDTO dto) {
        return modelMapper.map(dto, Cinemas.class);
    }

    @Override
    public List<CinemaDTO> toDtoList(List<Cinemas> entities) {
        return entities.stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public List<Cinemas> toEntityList(List<CinemaDTO> dtos) {
        return dtos.stream().map(this::toEntity).collect(Collectors.toList());
    }

    @Override
    public Set<CinemaDTO> toDtoSet(Set<Cinemas> entities) {
        return entities.stream().map(this::toDto).collect(Collectors.toSet());
    }

    @Override
    public Set<Cinemas> toEntitySet(Set<CinemaDTO> dtos) {
        return dtos.stream().map(this::toEntity).collect(Collectors.toSet());
    }
}