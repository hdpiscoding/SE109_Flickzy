package com.flickzy.service.implemetations;

import com.flickzy.entity.Users;
import com.flickzy.service.interfaces.JwtService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class JwtServiceImpl implements JwtService {
    @Value("${JWT_SECRET}")
    private String SECRET_KEY;

    @Override
    public String generateToken(Users user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", user.getId());
        claims.put("role", user.getRole());
        return Jwts
                .builder()
                .setClaims(claims)
                .setSubject(user.getEmail())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 3600 * 24)) // 1 day
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    @Override
    public String extractEmail(String token) {
        Claims claims = extractAllClaims(token);
        if (claims != null) {
            Date expiration = claims.getExpiration();
            boolean isExpired = expiration.before(Date.from(Instant.now()));
            if (!isExpired) {
                return claims.getSubject();
            }
            else {
                return null;
            }
        }
        return null;
    }

    @Override
    public UUID extractUserId(String token) {
        Claims claims = extractAllClaims(token);
        if (claims != null) {
            Date expiration = claims.getExpiration();
            boolean isExpired = expiration.before(Date.from(Instant.now()));
            if (!isExpired) {
                return UUID.fromString(claims.get("userId", String.class));
            }
            else {
                return null;
            }
        }
        return null;
    }

    @Override
    public String extractRole(String token) {
        Claims claims = extractAllClaims(token);
        if (claims != null) {
            Date expiration = claims.getExpiration();
            boolean isExpired = expiration.before(Date.from(Instant.now()));
            if (!isExpired) {
                return claims.get("role", String.class);
            }
            else {
                return null;
            }
        }
        return null;
    }

    @Override
    public boolean isTokenExpired(String token) {
        Claims claims = extractAllClaims(token);
        if (claims != null) {
            Date expiration = claims.getExpiration();
            return expiration.before(Date.from(Instant.now()));
        }
        return true;
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
