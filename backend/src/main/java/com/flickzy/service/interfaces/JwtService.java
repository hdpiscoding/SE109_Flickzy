package com.flickzy.service.interfaces;

import com.flickzy.entity.Users;

import java.util.UUID;

public interface JwtService {
    String generateToken(Users user);
    String extractEmail(String token);
    UUID extractUserId(String token);
    String extractRole(String token);
    boolean isTokenExpired(String token);
}
