package com.flickzy.service.interfaces;

public interface OTPService {
    void saveOTP(String email, String otp);
    boolean verifyOTP(String email, String otp);
    boolean canSendOTP(String email);
}
