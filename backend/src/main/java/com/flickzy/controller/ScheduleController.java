package com.flickzy.controller;

import com.flickzy.base.BaseController;
import com.flickzy.dto.Schedule.CinemaScheduleFilterDTO;
import com.flickzy.dto.Schedule.CinemaScheduleResponseDTO;
import com.flickzy.dto.Schedule.MovieScheduleFilterDTO;
import com.flickzy.dto.Schedule.MovieScheduleResponseDTO;
import com.flickzy.dto.Schedule.ScheduleDTO;
import com.flickzy.dto.Schedule.ScheduleSimpleDTO;
import com.flickzy.service.interfaces.ScheduleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ScheduleController extends BaseController {
    private final ScheduleService scheduleService;

    @PostMapping("/schedule-by-cinema")
    public ResponseEntity<Object> getSchedulesByCinema(@Valid @RequestBody CinemaScheduleFilterDTO filterDTO) {
        List<CinemaScheduleResponseDTO> schedules = scheduleService.getSchedulesByCinema(filterDTO);
        return buildResponse(schedules, HttpStatus.OK, "Schedules retrieved successfully");
    }

    @PostMapping("/schedule-by-movie")
    public ResponseEntity<Object> getSchedulesByMovie(@Valid @RequestBody MovieScheduleFilterDTO filterDTO) {
        List<MovieScheduleResponseDTO> schedules = scheduleService.getSchedulesByMovie(filterDTO);
        return buildResponse(schedules, HttpStatus.OK, "Schedules retrieved successfully");
    }

    @PostMapping("/schedule")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Object> addSchedule(@Valid @RequestBody ScheduleDTO scheduleDTO) {
        CinemaScheduleResponseDTO response = scheduleService.addSchedule(scheduleDTO);
        return buildResponse(response, HttpStatus.CREATED, "Schedule added successfully");
    }

    @PutMapping("/schedule/{scheduleId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Object> editSchedule(
            @PathVariable UUID scheduleId,
            @Valid @RequestBody ScheduleDTO scheduleDTO) {
        CinemaScheduleResponseDTO response = scheduleService.editSchedule(scheduleId, scheduleDTO);
        return buildResponse(response, HttpStatus.OK, "Schedule updated successfully");
    }

    @DeleteMapping("/schedule/{scheduleId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Object> deleteSchedule(@PathVariable UUID scheduleId) {
        scheduleService.deleteSchedule(scheduleId);
        return buildResponse(null, HttpStatus.OK, "Schedule deleted successfully");
    }

    @GetMapping("/schedules")
    public ResponseEntity<Object> getAllSchedules() {
        List<ScheduleSimpleDTO> schedules = scheduleService.getAllSchedules();
        return buildResponse(schedules, HttpStatus.OK, "All schedules retrieved successfully");
    }
}