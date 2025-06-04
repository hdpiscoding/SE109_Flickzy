package com.flickzy.mapper;

import com.flickzy.base.BaseMapper;
import com.flickzy.dto.BookingResponseDTO;
import com.flickzy.entity.Booking;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class BookingMapper implements BaseMapper<Booking, BookingResponseDTO> {
    private final ModelMapper modelMapper;

    @Override
    public BookingResponseDTO toDto(Booking entity) {
        BookingResponseDTO response = new BookingResponseDTO();
        response.setBookingId(entity.getBookingId());
        response.setCreatedAt(entity.getCreatedAt());
        response.setSeatStatus(entity.getSeatStatus());
        response.setPrice(entity.getPrice());

        // Add seats and snacks JSON
        response.setSeats(entity.getSeats());
        response.setSnacks(entity.getSnacks());

        // Movie Info
        BookingResponseDTO.MovieInfoDTO movieInfo = new BookingResponseDTO.MovieInfoDTO(
                entity.getSchedule().getMovie().getId(),
                entity.getSchedule().getMovie().getMovieName(),
                entity.getSchedule().getMovie().getAgeRating(),
                entity.getSchedule().getMovie().getMoviePoster(),
                entity.getSchedule().getMovie().getGenres().stream()
                        .map(g -> g.getName())
                        .collect(Collectors.joining(", "))
        );
        response.setMovieInfo(movieInfo);

        // Schedule Info
        BookingResponseDTO.ScheduleInfoDTO scheduleInfo = new BookingResponseDTO.ScheduleInfoDTO(
                entity.getSchedule().getScheduleId(),
                entity.getSchedule().getScheduleDate(),
                entity.getSchedule().getScheduleStart(),
                entity.getSchedule().getScheduleEnd(),
                entity.getSchedule().getRoom().getRoomId(),
                entity.getSchedule().getRoom().getRoomType()
        );
        response.setScheduleInfo(scheduleInfo);

        // Cinema Info
        BookingResponseDTO.CinemaInfoDTO cinemaInfo = new BookingResponseDTO.CinemaInfoDTO(
                entity.getSchedule().getRoom().getCinema().getId(),
                entity.getSchedule().getRoom().getCinema().getCinemaName(),
                entity.getSchedule().getRoom().getCinema().getCinemaAddress(),
                entity.getSchedule().getRoom().getCinema().getProvince()
        );
        response.setCinemaInfo(cinemaInfo);

        return response;
    }

    @Override
    public Booking toEntity(BookingResponseDTO dto) {
        return modelMapper.map(dto, Booking.class);
    }

    @Override
    public List<BookingResponseDTO> toDtoList(List<Booking> entities) {
        return entities.stream().map(this::toDto).toList();
    }

    @Override
    public List<Booking> toEntityList(List<BookingResponseDTO> dtos) {
        return dtos.stream().map(this::toEntity).toList();
    }

    @Override
    public Set<BookingResponseDTO> toDtoSet(Set<Booking> entities) {
        return entities.stream().map(this::toDto).collect(Collectors.toSet());
    }

    @Override
    public Set<Booking> toEntitySet(Set<BookingResponseDTO> dtos) {
        return dtos.stream().map(this::toEntity).collect(Collectors.toSet());
    }
}