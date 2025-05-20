package com.flickzy.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable()) // Tắt CSRF (chỉ cần nếu dùng API, không dùng form login)
            .authorizeHttpRequests(auth -> auth.anyRequest().permitAll()); // Mở toàn bộ API

        return http.build();
    }
}
