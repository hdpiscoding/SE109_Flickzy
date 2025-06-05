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
                    "<h2>🎬 Xác nhận đặt vé</h2>" +
                            "<p>Cảm ơn bạn đã đặt vé! Thông tin chi tiết của bạn:</p>" +
                            "<hr>" +
                            "<h3>Thông tin phim</h3>" +
                            "<ul>" +
                            "  <li><b>Tên phim:</b> " + body.getMovieName() + "</li>" +
                            "  <li><b>Ngày chiếu:</b> " + body.getScheduleDate() + "</li>" +
                            "  <li><b>Thời gian:</b> " + body.getScheduleStart() + " - " + body.getScheduleEnd() + "</li>" +
                            "</ul>" +
                            "<h3>Thông tin phòng chiếu</h3>" +
                            "<ul>" +
                            "  <li><b>Phòng:</b> " + body.getRoomName() + "</li>" +
                            "  <li><b>Loại phòng:</b> " + body.getRoomType() + "</li>" +
                            "</ul>" +
                            "<h3>Ghế đã đặt</h3>" +
                            "<table border='1' cellpadding='5' cellspacing='0'>" +
                            "  <tr><th>Ghế</th><th>Giá</th></tr>" +
                            body.getSeats().stream()
                                    .map(seat -> "<tr><td>" + seat.getSeatName() + "</td><td>" + seat.getPrice() + "₫</td></tr>")
                                    .reduce("", String::concat) +
                            "</table>" +
                            "<h3>Đồ ăn kèm</h3>" +
                            "<table border='1' cellpadding='5' cellspacing='0'>" +
                            "  <tr><th>Tên</th><th>Số lượng</th><th>Giá</th></tr>" +
                            body.getSnacks().stream()
                                    .map(snack -> "<tr><td>" + snack.getSnackName() + "</td><td>" + snack.getQuantity() + "</td><td>" + snack.getPrice() + "₫</td></tr>")
                                    .reduce("", String::concat) +
                            "</table>" +
                            "<hr>" +
                            "<h3>Tổng cộng: <span style='color:green'>" + body.getTotalPrice() + "₫</span></h3>" +
                            "<p>Chúc bạn xem phim vui vẻ!</p>";

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
