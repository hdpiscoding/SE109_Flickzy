package com.flickzy.service.implemetations;

import com.flickzy.dto.AuthResponseDTO;
import com.flickzy.dto.LoginDTO;
import com.flickzy.dto.RegisterDTO;
import com.flickzy.dto.User.UserResponse;
import com.flickzy.entity.Users;
import com.flickzy.exception.InvalidOTPException;
import com.flickzy.exception.TooManyRequestsException;
import com.flickzy.mapper.UserMapper;
import com.flickzy.repository.UserRepository;
import com.flickzy.service.interfaces.AuthService;
import com.flickzy.service.interfaces.EmailService;
import com.flickzy.service.interfaces.JwtService;
import com.flickzy.service.interfaces.OTPService;
import com.flickzy.utils.enums.Role;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;
    private final OTPService otpService;

    @Override
    public AuthResponseDTO register(RegisterDTO request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DataIntegrityViolationException("Email already exists");
        }
        Users user = new Users();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);
        Users newUser = userRepository.save(user);
        String token = jwtService.generateToken(newUser);
        return AuthResponseDTO
                .builder()
                .user(userMapper.toDto(newUser))
                .token(token)
                .build();
    }

    @Override
    public AuthResponseDTO login(LoginDTO request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword())
        );
        Users user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        String token = jwtService.generateToken(user);
        UserResponse userDTO = userMapper.toDto(user);
        return AuthResponseDTO
                .builder()
                .user(userDTO)
                .token(token)
                .build();
    }

    @Override
    public void forgotPassword(String email) {
        try {
            if (!userRepository.existsByEmail(email)) {
                throw new RuntimeException("User not found");
            }
            if (!otpService.canSendOTP(email)){
                throw new TooManyRequestsException("Too many requests. Please try again later.");
            }
            String otp = emailService.generateOTP();
            otpService.saveOTP(email, otp);
            emailService.sendOTPEmail(email, otp);
        }
        catch (MessagingException e)
        {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public UserResponse resetPassword(String otp, String email, String newPassword) {
        boolean isValid = otpService.verifyOTP(email, otp);
        if (!isValid) {
            throw new InvalidOTPException("OTP is invalid or expired. Please try again.");
        }
        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        return userMapper.toDto(user);
    }
}
