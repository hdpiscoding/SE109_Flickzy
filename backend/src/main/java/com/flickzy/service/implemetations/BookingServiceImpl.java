package com.flickzy.service.implemetations;

import com.flickzy.dto.BookingRequestDTO;
import com.flickzy.dto.BookingResponseDTO;
import com.flickzy.entity.Booking;
import com.flickzy.entity.Schedule;
import com.flickzy.entity.Seats;
import com.flickzy.entity.Users;
import com.flickzy.mapper.BookingMapper;
import com.flickzy.repository.BookingRepository;
import com.flickzy.repository.ScheduleRepository;
import com.flickzy.repository.SeatsRepository;
import com.flickzy.repository.UserRepository;
import com.flickzy.service.interfaces.BookingService;
import com.flickzy.specification.BookingSpecifications;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class BookingServiceImpl implements BookingService {
    private static final Logger logger = LoggerFactory.getLogger(BookingServiceImpl.class);
    private final BookingRepository bookingRepository;
    private final ScheduleRepository scheduleRepository;
    private final SeatsRepository seatRepository;
    private final UserRepository userRepository;
    private final BookingMapper bookingMapper;

    @Override
    public List<BookingResponseDTO> getBookingHistory(UUID userId) {
        logger.info("Fetching booking history for user: userId={}", userId);
        List<Booking> bookings = bookingRepository.findAll(
                BookingSpecifications.byUserId(userId)
        );
        return bookingMapper.toDtoList(bookings);
    }

    @Override
    @Transactional
    public BookingResponseDTO addBooking(BookingRequestDTO bookingRequestDTO, UUID userId) {
        logger.info("Adding new booking: scheduleId={}, seatId={}, userId={}",
                bookingRequestDTO.getScheduleId(), bookingRequestDTO.getSeatId(), userId);

        // Validate Schedule
        Schedule schedule = scheduleRepository.findById(bookingRequestDTO.getScheduleId())
                .orElseThrow(() -> {
                    logger.error("Schedule not found: {}", bookingRequestDTO.getScheduleId());
                    return new EntityNotFoundException("Schedule not found");
                });

        // Validate User
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> {
                    logger.error("User not found: {}", userId);
                    return new EntityNotFoundException("User not found");
                });

        // Validate Seat
        Seats seat = seatRepository.findById(bookingRequestDTO.getSeatId())
                .orElseThrow(() -> {
                    logger.error("Seat not found: {}", bookingRequestDTO.getSeatId());
                    return new EntityNotFoundException("Seat not found");
                });

        // Check if seat belongs to the schedule's room
        if (!seat.getRoom().getRoomId().equals(schedule.getRoom().getRoomId())) {
            logger.error("Seat does not belong to the schedule's room: seatId={}, roomId={}",
                    seat.getSeatId(), schedule.getRoom().getRoomId());
            throw new IllegalArgumentException("Seat does not belong to the schedule's room");
        }

        // Check if seat is already booked
        long existingBookings = bookingRepository.count(
                BookingSpecifications.byScheduleAndSeat(schedule.getScheduleId(), seat.getSeatId()));
        if (existingBookings > 0) {
            logger.error("Seat is already booked: seatId={}", seat.getSeatId());
            throw new IllegalStateException("Seat is already booked");
        }

        // Validate Price
        Integer expectedPrice = seat.getPrice() != null ? seat.getPrice() : seat.getSeatTypeId().getPrice();
        if (!bookingRequestDTO.getPrice().equals(expectedPrice.doubleValue())) {
            logger.error("Invalid price: provided={}, expected={}", bookingRequestDTO.getPrice(), expectedPrice);
            throw new IllegalArgumentException("Price does not match the seat's price");
        }

        // Validate Schedule Time
        LocalDateTime scheduleStart = schedule.getScheduleDate().atTime(schedule.getScheduleStart());
        if (scheduleStart.isBefore(LocalDateTime.now())) {
            logger.error("Cannot book a past schedule: scheduleId={}", schedule.getScheduleId());
            throw new IllegalStateException("Cannot book a past schedule");
        }

        // Create Booking
        Booking booking = Booking.builder()
                .bookingId(UUID.randomUUID())
                .user(user)
                .schedule(schedule)
                .seat(seat)
                .price(bookingRequestDTO.getPrice())
                .seatStatus(1) // CONFIRMED
                .build();

        Booking savedBooking = bookingRepository.save(booking);
        logger.info("Booking added successfully: bookingId={}", savedBooking.getBookingId());
        return bookingMapper.toDto(savedBooking);
    }
    @Override
    public List<BookingResponseDTO> getBookingByScheduleId(UUID scheduleId) {
        logger.info("Fetching bookings for schedule: scheduleId={}", scheduleId);
        List<Booking> bookings = bookingRepository.findAll(
                BookingSpecifications.byScheduleId(scheduleId)
        );
        return bookingMapper.toDtoList(bookings);
    }
}