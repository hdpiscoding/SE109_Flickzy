package com.flickzy.utils.constants;

public class OTPConstants {
    public static final long OTP_EXPIRY_MINUTES = 5;
    public static final int MAX_ATTEMPTS = 5;

    private OTPConstants() {
        throw new UnsupportedOperationException("This is a utility class and cannot be instantiated");
    }
}
