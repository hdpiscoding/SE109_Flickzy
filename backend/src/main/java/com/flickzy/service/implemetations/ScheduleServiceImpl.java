package com.flickzy.service.implemetations;

import com.flickzy.dto.Schedule.CinemaScheduleFilterDTO;
import com.flickzy.dto.Schedule.CinemaScheduleResponseDTO;
import com.flickzy.dto.Schedule.MovieScheduleFilterDTO;
import com.flickzy.dto.Schedule.MovieScheduleResponseDTO;
import com.flickzy.dto.Schedule.ScheduleDTO;
import com.flickzy.entity.Movies;
import com.flickzy.entity.Room;
import com.flickzy.entity.Schedule;
import com.flickzy.entity.ScheduleType;
import com.flickzy.mapper.ScheduleMapper;
import com.flickzy.repository.MovieRepository;
import com.flickzy.repository.RoomRepository;
import com.flickzy.repository.ScheduleRepository;
import com.flickzy.repository.ScheduleTypeRepository;
import com.flickzy.service.interfaces.ScheduleService;
import com.flickzy.specification.ScheduleSpecifications;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class ScheduleServiceImpl implements ScheduleService {
    private static final Logger logger = LoggerFactory.getLogger(ScheduleServiceImpl.class);
    private final ScheduleRepository scheduleRepository;
    private final MovieRepository movieRepository;
    private final RoomRepository roomRepository;
    private final ScheduleMapper scheduleMapper;
    private final ScheduleTypeRepository scheduleTypeRepository;

    @Override
    public List<CinemaScheduleResponseDTO> getSchedulesByCinema(CinemaScheduleFilterDTO filterDTO) {
        logger.info("Fetching schedules by cinema: cinemaId={}, date={}", filterDTO.getCinemaId(), filterDTO.getDate());
        List<Schedule> schedules = scheduleRepository.findAll(
                ScheduleSpecifications.byCinemaAndDate(filterDTO.getCinemaId(), filterDTO.getDate(), filterDTO.getTypeId())
        );
        return scheduleMapper.toCinemaScheduleResponseDTOs(schedules);
    }

    @Override
    public List<MovieScheduleResponseDTO> getSchedulesByMovie(MovieScheduleFilterDTO filterDTO) {
        logger.info("Fetching schedules for movie: movieId={}, date={}, cinemaBrandId={}, province={}",
                filterDTO.getMovieId(), filterDTO.getDate(), filterDTO.getCinemaBrandId(), filterDTO.getProvince());

        List<Schedule> schedules = scheduleRepository.findAll(
                ScheduleSpecifications.byMovieAndDateAndBrandAndProvince(
                        filterDTO.getMovieId(),
                        filterDTO.getDate(),
                        filterDTO.getCinemaBrandId(),
                        filterDTO.getProvince(),
                        filterDTO.getTypeId()
                )
        );

        return scheduleMapper.toMovieScheduleResponseDTOs(schedules);
    }

    @Override
    @Transactional
    public CinemaScheduleResponseDTO addSchedule(ScheduleDTO scheduleDTO) {
        logger.info("Adding new schedule: movieId={}, roomId={}", scheduleDTO.getMovieId(), scheduleDTO.getRoomId());
        validateScheduleTimes(scheduleDTO);

        Movies movie = movieRepository.findById(scheduleDTO.getMovieId())
                .orElseThrow(() -> {
                    logger.error("Movie not found: {}", scheduleDTO.getMovieId());
                    return new EntityNotFoundException("Movie not found");
                });

        Room room = roomRepository.findById(scheduleDTO.getRoomId())
                .orElseThrow(() -> {
                    logger.error("Room not found: {}", scheduleDTO.getRoomId());
                    return new EntityNotFoundException("Room not found");
                });

        Schedule schedule = scheduleMapper.toEntity(scheduleDTO);
        schedule.setMovie(movie);
        schedule.setRoom(room);

        // Set schedule type if provided
        if (scheduleDTO.getTypeId() != null) {
            ScheduleType type = scheduleTypeRepository.findById(scheduleDTO.getTypeId())
                    .orElseThrow(() -> {
                        logger.error("ScheduleType not found: {}", scheduleDTO.getTypeId());
                        return new EntityNotFoundException("ScheduleType not found");
                    });
            schedule.setType(type);
        }

        Schedule savedSchedule = scheduleRepository.save(schedule);
        logger.info("Schedule added successfully: scheduleId={}", savedSchedule.getScheduleId());
        return scheduleMapper.toCinemaScheduleResponseDTOs(List.of(savedSchedule)).get(0);
    }

    @Override
    @Transactional
    public CinemaScheduleResponseDTO editSchedule(UUID scheduleId, ScheduleDTO scheduleDTO) {
        logger.info("Updating schedule: scheduleId={}", scheduleId);
        validateScheduleTimes(scheduleDTO);

        Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> {
                    logger.error("Schedule not found: {}", scheduleId);
                    return new EntityNotFoundException("Schedule not found");
                });

        if (scheduleDTO.getMovieId() != null) {
            Movies movie = movieRepository.findById(scheduleDTO.getMovieId())
                    .orElseThrow(() -> {
                        logger.error("Movie not found: {}", scheduleDTO.getMovieId());
                        return new EntityNotFoundException("Movie not found");
                    });
            schedule.setMovie(movie);
        }

        if (scheduleDTO.getRoomId() != null) {
            Room room = roomRepository.findById(scheduleDTO.getRoomId())
                    .orElseThrow(() -> {
                        logger.error("Room not found: {}", scheduleDTO.getRoomId());
                        return new EntityNotFoundException("Room not found");
                    });
            schedule.setRoom(room);
        }

        scheduleMapper.updateEntityFromDto(scheduleDTO, schedule);
        Schedule updatedSchedule = scheduleRepository.save(schedule);
        logger.info("Schedule updated successfully: scheduleId={}", updatedSchedule.getScheduleId());
        return scheduleMapper.toCinemaScheduleResponseDTOs(List.of(updatedSchedule)).get(0);
    }

    @Override
    @Transactional
    public void deleteSchedule(UUID scheduleId) {
        logger.info("Deleting schedule: scheduleId={}", scheduleId);
        Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> {
                    logger.error("Schedule not found: {}", scheduleId);
                    return new EntityNotFoundException("Schedule not found");
                });

        if (!schedule.getBookings().isEmpty()) {
            logger.error("Cannot delete schedule with existing bookings: {}", scheduleId);
            throw new IllegalStateException("Cannot delete schedule with existing bookings");
        }

        scheduleRepository.delete(schedule);
        logger.info("Schedule deleted successfully: scheduleId={}", scheduleId);
    }

    private void validateScheduleTimes(ScheduleDTO scheduleDTO) {
        if (scheduleDTO.getScheduleEnd().isBefore(scheduleDTO.getScheduleStart())) {
            logger.error("End time must be after start time: start={}, end={}",
                    scheduleDTO.getScheduleStart(), scheduleDTO.getScheduleEnd());
            throw new IllegalArgumentException("End time must be after start time");
        }
    }
}