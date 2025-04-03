package com.flickzy.controller;

import com.flickzy.dto.User.ChangePasswordRequest;
import com.flickzy.dto.User.UserResponse;
import com.flickzy.entity.Users;
import com.flickzy.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/users/me")
@CrossOrigin(origins = "*") // Cho phép gọi từ frontend
public class UserController {

    @Autowired
    private UserService userService;


    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable UUID id) {
        Users user = userService.getUserById(id);
        UserResponse userDTO = new UserResponse();
        userDTO.setId(user.getId());
        userDTO.setFullname(user.getFullname());
        userDTO.setEmail(user.getEmail());
        return ResponseEntity.ok(userDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> editUser(
            @PathVariable UUID id,
            @RequestBody Users updatedUser) {
        Users user = userService.editUser(id, updatedUser);
        UserResponse userDTO = new UserResponse();
        userDTO.setId(user.getId());
        userDTO.setFullname(user.getFullname());
        userDTO.setEmail(user.getEmail());
        return ResponseEntity.ok(userDTO);
    }
    @PutMapping("/change-password/{id}")
    public ResponseEntity<Users> changePassword(
            @PathVariable UUID id,
            @RequestBody ChangePasswordRequest changePasswordRequest) {
        return ResponseEntity.ok(userService.changePassword(id, changePasswordRequest.getOldPassword(), changePasswordRequest.getNewPassword()));
    }
}
