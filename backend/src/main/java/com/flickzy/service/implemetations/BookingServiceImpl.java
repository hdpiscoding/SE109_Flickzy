package com.flickzy.service.implemetations;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.flickzy.dto.BookingRequestDTO;
import com.flickzy.dto.BookingSeatResponseDTO;
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
import java.util.Optional;
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
    private final ObjectMapper objectMapper = new ObjectMapper(); // Add this

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
    public List<BookingResponseDTO> addBooking(BookingRequestDTO bookingRequestDTO, UUID userId) {
        logger.info("Adding new booking: scheduleId={}, userId={}", bookingRequestDTO.getScheduleId(), userId);
    
        // Validate Schedule
        Schedule schedule = scheduleRepository.findById(bookingRequestDTO.getScheduleId())
                .orElseThrow(() -> {
                    logger.error("Schedule not found: {}", bookingRequestDTO.getScheduleId());
                    return new EntityNotFoundException("Schedule not found");
                });
    
        // Nếu userId null thì user cũng null (cho phép booking guest)
        Users user = null;
        if (userId != null) {
            user = userRepository.findById(userId)
                    .orElseThrow(() -> {
                        logger.error("User not found: {}", userId);
                        return new EntityNotFoundException("User not found");
                    });
        }
    
        // Serialize seats and snacks to JSON
        String seatsJson;
        String snacksJson;
        try {
            seatsJson = objectMapper.writeValueAsString(bookingRequestDTO.getSeats());
            snacksJson = objectMapper.writeValueAsString(bookingRequestDTO.getSnacks());
        } catch (Exception e) {
            logger.error("Failed to serialize seats/snacks", e);
            throw new IllegalArgumentException("Invalid seats/snacks data");
        }
    
        // Tính tổng tiền
        double totalPrice = 0.0;
        if (bookingRequestDTO.getSeats() != null) {
            totalPrice += bookingRequestDTO.getSeats().stream()
                .filter(s -> s.getPrice() != null)
                .mapToDouble(BookingRequestDTO.SeatDTO::getPrice)
                .sum();
        }
        if (bookingRequestDTO.getSnacks() != null) {
            totalPrice += bookingRequestDTO.getSnacks().stream()
                .filter(s -> s.getPrice() != null && s.getQuantity() != null)
                .mapToDouble(s -> s.getPrice() * s.getQuantity())
                .sum();
        }
    
        // Create Booking (one booking per request)
        Booking booking = Booking.builder()
                .user(user) // user có thể null
                .schedule(schedule)
                .seats(seatsJson)
                .snacks(snacksJson)
                .price(totalPrice)
                .seatStatus(1) // CONFIRMED
                .momoID(bookingRequestDTO.getMomoID())
                .build();
    
        Booking savedBooking = bookingRepository.save(booking);
        logger.info("Booking added successfully: bookingId={}", savedBooking.getBookingId());
    
        return List.of(bookingMapper.toDto(savedBooking));
    }
    public List<BookingResponseDTO> getBookingByScheduleId(UUID scheduleId) {
        logger.info("Fetching bookings for scheduleId={}", scheduleId);
        List<Booking> bookings = bookingRepository.findAll(
                BookingSpecifications.byScheduleId(scheduleId)
        );
        return bookingMapper.toDtoList(bookings);
    }
    @Override
    public boolean existsByMomoID(String momoId) {
        return bookingRepository.existsByMomoID(momoId);
    }
    @Override
    public List<BookingSeatResponseDTO> getBookedSeatIdsByScheduleId(UUID scheduleId) {
        // Lấy danh sách booking theo scheduleId
        List<BookingResponseDTO> bookings = getBookingByScheduleId(scheduleId);
        // Trả về danh sách seatId đã được đặt
        // Parse seatIds from each booking's seats JSON
        List<BookingSeatResponseDTO> seatIds = new java.util.ArrayList<>();
        for (BookingResponseDTO booking : bookings) {
            String seatsJson = booking.getSeats();
            if (seatsJson != null) {
                try {
                    List<com.flickzy.dto.BookingRequestDTO.SeatDTO> seats = objectMapper.readValue(
                        seatsJson, new TypeReference<>() {});
                    for (com.flickzy.dto.BookingRequestDTO.SeatDTO seat : seats) {
                        seatIds.add(new BookingSeatResponseDTO(seat.getSeatId()));
                    }
                } catch (Exception e) {
                    logger.error("Failed to parse seats JSON for bookingId={}", booking.getBookingId(), e);
                }
            }
        }
        return seatIds;
    }
    @Override
public boolean updateEmailByMomoID(String momoId, String email) {
    Optional<Booking> bookingOpt = bookingRepository.findByMomoID(momoId);
    if (bookingOpt.isPresent()) {
        Booking booking = bookingOpt.get();
        booking.setEmail(email);
        bookingRepository.save(booking);
        return true;
    }
    return false;
}
}