package com.flickzy.service.implemetations;

import com.flickzy.dto.ChangePasswordDTO;
import com.flickzy.dto.UpdateUserDTO;
import com.flickzy.dto.User.UserResponse;
import com.flickzy.entity.Users;
import com.flickzy.mapper.UserMapper;
import com.flickzy.repository.UserRepository;
import com.flickzy.service.interfaces.UserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class UserServiceImpl implements UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void changePassword(String email, ChangePasswordDTO changePasswordDTO) {
        logger.info("Attempting to change password for user: {}", email);
        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> {
                    logger.error("User not found with email: {}", email);
                    return new EntityNotFoundException("User not found");
                });

        if (!passwordEncoder.matches(changePasswordDTO.getCurrentPassword(), user.getPassword())) {
            logger.warn("Incorrect current password for user: {}", email);
            throw new BadCredentialsException("Current password is incorrect");
        }

        if (changePasswordDTO.getNewPassword().equals(changePasswordDTO.getCurrentPassword())) {
            logger.warn("New password is the same as current password for user: {}", email);
            throw new IllegalArgumentException("New password must be different from current password");
        }

        user.setPassword(passwordEncoder.encode(changePasswordDTO.getNewPassword()));
        userRepository.save(user);
        logger.info("Password changed successfully for user: {}", email);
    }

    @Override
    public UserResponse updateProfile(String email, UpdateUserDTO updateUserDTO) {
        logger.info("Updating profile for user: {}", email);
        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> {
                    logger.error("User not found with email: {}", email);
                    return new EntityNotFoundException("User not found");
                });

        userMapper.updateEntityFromDto(updateUserDTO, user);
        Users updatedUser = userRepository.save(user);
        logger.info("Profile updated successfully for user: {}", email);
        return userMapper.toDto(updatedUser);
    }

    @Override
    public UserResponse getProfile(String email) {
        logger.info("Retrieving profile for user: {}", email);
        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> {
                    logger.error("User not found with email: {}", email);
                    return new EntityNotFoundException("User not found");
                });
        return userMapper.toDto(user);
    }
}