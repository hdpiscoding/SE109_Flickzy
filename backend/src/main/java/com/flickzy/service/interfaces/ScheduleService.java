package com.flickzy.service.interfaces;

import com.flickzy.dto.Schedule.CinemaScheduleFilterDTO;
import com.flickzy.dto.Schedule.CinemaScheduleResponseDTO;
import com.flickzy.dto.Schedule.MovieScheduleFilterDTO;
import com.flickzy.dto.Schedule.MovieScheduleResponseDTO;
import com.flickzy.dto.Schedule.ScheduleDTO;
import com.flickzy.dto.Schedule.ScheduleSimpleDTO;

import java.util.List;
import java.util.UUID;

public interface ScheduleService {
    List<CinemaScheduleResponseDTO> getSchedulesByCinema(CinemaScheduleFilterDTO filterDTO);
    List<MovieScheduleResponseDTO> getSchedulesByMovie(MovieScheduleFilterDTO filterDTO);
    CinemaScheduleResponseDTO addSchedule(ScheduleDTO scheduleDTO);
    CinemaScheduleResponseDTO editSchedule(UUID scheduleId, ScheduleDTO scheduleDTO);
    void deleteSchedule(UUID scheduleId);

    List<ScheduleSimpleDTO> getAllSchedules();
}