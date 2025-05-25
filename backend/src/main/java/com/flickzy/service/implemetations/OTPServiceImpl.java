package com.flickzy.service.implemetations;

import com.github.benmanes.caffeine.cache.Cache;
import com.flickzy.service.interfaces.OTPService;
import com.flickzy.utils.constants.OTPConstants;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OTPServiceImpl implements OTPService {
    private final Cache<String, String> otpCache;
    private final Cache<String, Integer> attemptCache;
    private static final Logger logger = LoggerFactory.getLogger(OTPServiceImpl.class);

    @Override
    public void saveOTP(String email, String otp) {
        otpCache.put(email, otp);
        attemptCache.asMap().merge(email + ":attempts", 1, (Integer::sum));
        logger.info("Saved OTP for email: {}", email);
    }

    @Override
    public boolean verifyOTP(String email, String otp) {
        String storedOtp = otpCache.getIfPresent(email);
        if (storedOtp == null) {
            logger.info("OTP for email: {}", email + " not found");
            return false;
        }
        boolean isValid = storedOtp.equals(otp);
        if (isValid) {
            otpCache.invalidate(email);
            logger.info("OTP for email: {}", email + " validated");
        }
        return isValid;
    }

    @Override
    public boolean canSendOTP(String email) {
        Integer attempts = attemptCache.getIfPresent(email + ":attempts");
        if (attempts == null) {
            attemptCache.put(email + ":attempts", 1);
            return true;
        }
        if (attempts >= OTPConstants.MAX_ATTEMPTS) {
            logger.warn("Attempt limit reached. Attempt count: {}", attempts);
            return false;
        }
        return true;
    }
}
