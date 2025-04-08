package com.flickzy.service;

import com.flickzy.entity.Booking;
import com.flickzy.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class BookingService {
    @Autowired
    BookingRepository bookingRepository;

    public List<Booking> getBookingHistory(UUID userId) {
        return bookingRepository.findByUserId(userId);
    }
    public Booking booking(  Booking bookingBody) {
        return bookingRepository.save(bookingBody);
    }
}