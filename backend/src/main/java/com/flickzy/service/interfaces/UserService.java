package com.flickzy.service.interfaces;

import com.flickzy.dto.ChangePasswordDTO;
import com.flickzy.dto.UpdateUserDTO;
import com.flickzy.dto.User.UserResponse;

public interface UserService {
    void changePassword(String email, ChangePasswordDTO changePasswordDTO);
    UserResponse updateProfile(String email, UpdateUserDTO updateUserDTO);
    UserResponse getProfile(String email);
}