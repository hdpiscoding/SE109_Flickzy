package com.flickzy.mapper;

import com.flickzy.base.BaseMapper;
import com.flickzy.dto.Schedule.CinemaScheduleResponseDTO;
import com.flickzy.dto.Schedule.MovieScheduleResponseDTO;
import com.flickzy.dto.Schedule.ScheduleDTO;
import com.flickzy.dto.Schedule.ScheduleSimpleDTO;
import com.flickzy.entity.CinemaBrand;
import com.flickzy.entity.Cinemas;
import com.flickzy.entity.Schedule;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class ScheduleMapper implements BaseMapper<Schedule, CinemaScheduleResponseDTO> {
    private final ModelMapper modelMapper;

    @Override
    public CinemaScheduleResponseDTO toDto(Schedule entity) {
        throw new UnsupportedOperationException("Use toCinemaScheduleResponseDTOs instead");
    }

    public List<CinemaScheduleResponseDTO> toCinemaScheduleResponseDTOs(List<Schedule> schedules) {
        Map<UUID, List<Schedule>> groupedByMovie = schedules.stream()
                .collect(Collectors.groupingBy(s -> s.getMovie().getId()));

        return groupedByMovie.entrySet().stream()
                .map(entry -> {
                    Schedule firstSchedule = entry.getValue().get(0);
                    String genresName = firstSchedule.getMovie().getGenres().stream()
                            .map(g -> g.getName())
                            .collect(Collectors.joining(", "));

                    List<CinemaScheduleResponseDTO.ScheduleDetailDTO> scheduleDetails = entry.getValue().stream()
                            .map(s -> new CinemaScheduleResponseDTO.ScheduleDetailDTO(
                                    s.getScheduleId(),
                                    s.getScheduleDate(),
                                    s.getScheduleStart(),
                                    s.getScheduleEnd(),
                                    s.getRoom().getRoomId(),
                                    s.getRoom().getRoomType(),
                                    s.getRoom().getRoomName(),

                                    s.getType() != null ? s.getType().getType() : null,
                                    s.getType() != null ? String.valueOf(s.getType().getId()) : null // ép kiểu về String

                            ))
                            .toList();

                    return new CinemaScheduleResponseDTO(
                            firstSchedule.getMovie().getId(),
                            firstSchedule.getMovie().getMovieName(),
                            firstSchedule.getMovie().getAgeRating(),
                            firstSchedule.getMovie().getMoviePoster(),
                            genresName,
                            scheduleDetails
                    );
                })
                .toList();
    }

    public List<MovieScheduleResponseDTO> toMovieScheduleResponseDTOs(List<Schedule> entities) {
// Nhóm schedules theo CinemaBrand
        Map<CinemaBrand, List<Schedule>> groupedByBrand = entities.stream()
                .collect(Collectors.groupingBy(
                        schedule -> schedule.getRoom().getCinema().getCinemaBrand()
                ));

        return groupedByBrand.entrySet().stream()
                .map(entry -> {
                    CinemaBrand brand = entry.getKey();
                    List<Schedule> schedules = entry.getValue();

                    // Nhóm schedules theo Cinema
                    Map<Cinemas, List<Schedule>> groupedByCinema = schedules.stream()
                            .collect(Collectors.groupingBy(
                                    schedule -> schedule.getRoom().getCinema()
                            ));

                    List<MovieScheduleResponseDTO.CinemaDTO> cinemaDtos = groupedByCinema.entrySet().stream()
                            .map(cinemaEntry -> {
                                Cinemas cinema = cinemaEntry.getKey();
                                List<MovieScheduleResponseDTO.ScheduleDTO> scheduleDtos = cinemaEntry.getValue().stream()
                                        .map(schedule -> new MovieScheduleResponseDTO.ScheduleDTO(
                                                schedule.getScheduleId(),
                                                schedule.getScheduleDate(),
                                                schedule.getScheduleStart(),
                                                schedule.getScheduleEnd(),
                                                schedule.getRoom().getRoomId(),
                                                schedule.getRoom().getRoomType(),
                                                schedule.getType() != null ? schedule.getType().getType() : null
                                        ))
                                        .toList();

                                return new MovieScheduleResponseDTO.CinemaDTO(
                                        cinema.getId(),
                                        cinema.getCinemaName(),
                                        cinema.getCinemaAddress(),
                                        cinema.getProvince(),
                                        scheduleDtos
                                );
                            })
                            .toList();

                    return new MovieScheduleResponseDTO(
                            brand.getBrandName(),
                            brand.getAvatar(),
                            cinemaDtos
                    );
                })
                .toList();
    }

    public Schedule toEntity(ScheduleDTO dto) {
        return Schedule.builder()
                .scheduleId(dto.getScheduleId())
                .scheduleDate(dto.getScheduleDate())
                .scheduleStart(dto.getScheduleStart())
                .scheduleEnd(dto.getScheduleEnd())
                .build();
    }

    public void updateEntityFromDto(ScheduleDTO dto, Schedule entity) {
        if (dto.getScheduleDate() != null) {
            entity.setScheduleDate(dto.getScheduleDate());
        }
        if (dto.getScheduleStart() != null) {
            entity.setScheduleStart(dto.getScheduleStart());
        }
        if (dto.getScheduleEnd() != null) {
            entity.setScheduleEnd(dto.getScheduleEnd());
        }
    }

    @Override
    public Schedule toEntity(CinemaScheduleResponseDTO dto) {
        return modelMapper.map(dto, Schedule.class);
    }

    @Override
    public List<CinemaScheduleResponseDTO> toDtoList(List<Schedule> entities) {
        return toCinemaScheduleResponseDTOs(entities);
    }

    @Override
    public List<Schedule> toEntityList(List<CinemaScheduleResponseDTO> dtos) {
        return dtos.stream().map(this::toEntity).toList();
    }

    @Override
    public Set<CinemaScheduleResponseDTO> toDtoSet(Set<Schedule> entities) {
        return toCinemaScheduleResponseDTOs(entities.stream().toList()).stream().collect(Collectors.toSet());
    }

    @Override
    public Set<Schedule> toEntitySet(Set<CinemaScheduleResponseDTO> dtos) {
        return dtos.stream().map(this::toEntity).collect(Collectors.toSet());
    }

    public ScheduleSimpleDTO toSimpleDto(Schedule entity) {
        ScheduleSimpleDTO dto = new ScheduleSimpleDTO();
        dto.setScheduleId(entity.getScheduleId());
        dto.setMovieId(entity.getMovie() != null ? entity.getMovie().getId() : null);
        dto.setRoomId(entity.getRoom() != null ? entity.getRoom().getRoomId() : null);
        dto.setScheduleDate(entity.getScheduleDate());
        dto.setScheduleStart(entity.getScheduleStart());
        dto.setScheduleEnd(entity.getScheduleEnd());
        dto.setTypeId(entity.getType() != null ? entity.getType().getId() : null);
        return dto;
    }

    public List<ScheduleSimpleDTO> toSimpleDtoList(List<Schedule> entities) {
        return entities.stream().map(this::toSimpleDto).toList();
    }
}