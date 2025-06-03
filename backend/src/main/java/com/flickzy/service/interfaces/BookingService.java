package com.flickzy.service.interfaces;

import com.flickzy.dto.BookingRequestDTO;
import com.flickzy.dto.BookingResponseDTO;
import com.flickzy.dto.BookingSeatResponseDTO;

import java.util.List;
import java.util.UUID;

public interface BookingService {
    List<BookingResponseDTO> getBookingHistory(UUID userId);
    List<BookingResponseDTO> addBooking(BookingRequestDTO bookingRequestDTO, UUID userId);
List<BookingSeatResponseDTO> getBookedSeatIdsByScheduleId(UUID scheduleId);

}