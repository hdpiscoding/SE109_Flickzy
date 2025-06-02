package com.flickzy.service.implemetations;

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
            helper.setSubject("OTP Verification");
            String htmlContent = "<h3>Your OTP code</h3>" +
                    "<p>OTP: <b>" + otp + "</b></p>" +
                    "<p>This OTP will expire in 5 minutes.</p>";
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
}
