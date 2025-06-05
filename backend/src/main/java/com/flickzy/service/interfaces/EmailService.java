package com.flickzy.service.interfaces;

import com.flickzy.dto.Booking.BookingNotificationDTO;
import com.flickzy.dto.BookingResponseDTO;
import jakarta.mail.MessagingException;

public interface EmailService {
    String generateOTP();
    void sendOTPEmail(String to, String otp) throws MessagingException;
    void sendBookNotificationEmail(String to, BookingNotificationDTO body) throws MessagingException;
}
