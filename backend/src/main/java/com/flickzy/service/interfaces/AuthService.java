package com.flickzy.service.interfaces;

import com.flickzy.dto.AuthResponseDTO;
import com.flickzy.dto.LoginDTO;
import com.flickzy.dto.RegisterDTO;

public interface AuthService {
    AuthResponseDTO register(RegisterDTO request);
    AuthResponseDTO login(LoginDTO request);
    void forgotPassword(String newPassword);
}
