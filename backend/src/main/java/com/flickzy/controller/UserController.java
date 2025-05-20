package com.flickzy.controller;

import com.flickzy.base.BaseController;
import com.flickzy.dto.ChangePasswordDTO;
import com.flickzy.dto.UpdateUserDTO;
import com.flickzy.dto.User.UserResponse;
import com.flickzy.service.interfaces.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users/me")
@RequiredArgsConstructor
public class UserController extends BaseController {
    private final UserService userService;

    @PutMapping("/change-password")
    public ResponseEntity<Object> changePassword(@Valid @RequestBody ChangePasswordDTO changePasswordDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName(); // Lấy email từ JWT
        userService.changePassword(email, changePasswordDTO);
        return buildResponse(null, HttpStatus.OK, "Password changed successfully");
    }

    @PutMapping("")
    public ResponseEntity<Object> updateProfile(@Valid @RequestBody UpdateUserDTO updateUserDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        UserResponse response = userService.updateProfile(email, updateUserDTO);
        return buildResponse(response, HttpStatus.OK, "Profile updated successfully");
    }

    @GetMapping("")
    public ResponseEntity<Object> getProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        UserResponse response = userService.getProfile(email);
        return buildResponse(response, HttpStatus.OK, "Profile retrieved successfully");
    }
}