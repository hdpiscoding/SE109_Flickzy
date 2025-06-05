package com.flickzy.service.implemetations;

import com.flickzy.dto.Booking.BookingNotificationDTO;
import com.flickzy.dto.BookingResponseDTO;
import com.flickzy.service.interfaces.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class EmailServiceImpl implements EmailService {
    private final JavaMailSender mailSender;
    private static final Logger logger = LoggerFactory.getLogger(EmailServiceImpl.class);

    @Override
    public String generateOTP() {
        return RandomStringUtils.randomNumeric(6);
    }

    @Override
    @Async
    public void sendOTPEmail(String to, String otp) throws MessagingException {
        try{
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

            helper.setTo(to);
            helper.setSubject("Xác thực OTP");
            String htmlContent = "<h3>Mã OTP của bạn</h3>" +
                    "<p>OTP: <b>" + otp + "</b></p>" +
                    "<p>Mã OTP này sẽ hết hạn trong vòng 5 phút.</p>";
            helper.setText(htmlContent, true);
            logger.info("Sending OTP verification email...");
            mailSender.send(mimeMessage);
        }
        catch(Exception e){
            logger.error("Error sending OTP email: {}", e.getMessage());
            throw new MessagingException("Failed to send OTP email", e);
        }
        finally {
            logger.info("OTP email sent to {} with OTP: {}", to, otp);
        }
    }

    @Override
    public void sendBookNotificationEmail(String to, BookingNotificationDTO body) throws MessagingException {
        try{
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

            String htmlContent =
                    "<h2>🎬 Booking Confirmation</h2>" +
                            "<p>Thank you for your booking! Here are your details:</p>" +
                            "<hr>" +
                            "<h3>Movie Information</h3>" +
                            "<ul>" +
                            "  <li><b>Movie:</b> " + body.getMovieName() + "</li>" +
                            "  <li><b>Date:</b> " + body.getScheduleDate() + "</li>" +
                            "  <li><b>Time:</b> " + body.getScheduleStart() + " - " + body.getScheduleEnd() + "</li>" +
                            "</ul>" +
                            "<h3>Room Information</h3>" +
                            "<ul>" +
                            "  <li><b>Room:</b> " + body.getRoomName() + "</li>" +
                            "  <li><b>Type:</b> " + body.getRoomType() + "</li>" +
                            "</ul>" +
                            "<h3>Seats</h3>" +
                            "<table border='1' cellpadding='5' cellspacing='0'>" +
                            "  <tr><th>Seat</th><th>Price</th></tr>" +
                            body.getSeats().stream()
                                    .map(seat -> "<tr><td>" + seat.getSeatName() + "</td><td>" + seat.getPrice() + "₫</td></tr>")
                                    .reduce("", String::concat) +
                            "</table>" +
                            "<h3>Snacks</h3>" +
                            "<table border='1' cellpadding='5' cellspacing='0'>" +
                            "  <tr><th>Snack</th><th>Quantity</th><th>Price</th></tr>" +
                            body.getSnacks().stream()
                                    .map(snack -> "<tr><td>" + snack.getSnackName() + "</td><td>" + snack.getQuantity() + "</td><td>" + snack.getPrice() + "₫</td></tr>")
                                    .reduce("", String::concat) +
                            "</table>" +
                            "<hr>" +
                            "<h3>Total Price: <span style='color:green'>" + body.getTotalPrice() + "₫</span></h3>" +
                            "<p>Enjoy your movie!</p>";

            helper.setTo(to);
            helper.setSubject("Thông báo đặt vé thành công");

            helper.setText(htmlContent, true);
            logger.info("Sending booking notification email...");
            mailSender.send(mimeMessage);
        }
        catch(Exception e){
            logger.error("Error sending booking email: {}", e.getMessage());
            throw new MessagingException("Failed to send booking email", e);
        }
        finally {
            logger.info("OTP email sent to {} with body: {}", to, "");
        }
    }
}
