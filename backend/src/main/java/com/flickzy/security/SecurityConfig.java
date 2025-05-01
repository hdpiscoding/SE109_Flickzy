package com.flickzy.security;

import com.flickzy.repository.UserRepository;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final UserRepository userRepository;
    private final AuthenticationFilter authenticationFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        // Public APIs (unauthenticated)
                        .requestMatchers("/error").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/v1/auth/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/genres").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/v1/movies/filter").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/movies/{id}").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/movie-showings").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/reviews/{movieId}").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/movie-showings/movies/{movieId}").permitAll()



//                        // User APIs
//                        .requestMatchers("/api/v1/users/me/**").hasAnyAuthority("USER", "ADMIN")
//                        .requestMatchers("/api/v1/rank").hasAuthority("USER")
//                        .requestMatchers(HttpMethod.GET, "/api/v1/reels/{id}").hasAuthority("USER")
//
                        // Admin APIs
                        .requestMatchers(HttpMethod.POST, "/api/v1/genres").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/reviews/{id}").hasAuthority("ADMIN")
                        .requestMatchers( "/api/v1/movies").hasAuthority("ADMIN")
                        .requestMatchers( "/api/v1/genres/**").hasAuthority("ADMIN")
                        .requestMatchers( "/api/v1/movies/**").hasAuthority("ADMIN")
                        .requestMatchers( "/api/v1/movie-showings/**").hasAuthority("ADMIN")

                        // default APIs
                        .anyRequest().authenticated()
                )
                .sessionManagement((session) -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .exceptionHandling(exception -> exception
                        .authenticationEntryPoint((request, response, authException) -> {
                            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                            response.setContentType("application/json");
                            response.getWriter().write("{\"status\":401, \"error\":\"Unauthorized\", \"message\":\"You need to login first\", \"path\":\"" + request.getRequestURI() + "\"}");
                        })
                        .accessDeniedHandler((request, response, accessDeniedException) -> {
                            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                            response.setContentType("application/json");
                            response.getWriter().write("{\"status\":403, \"error\":\"Forbidden\", \"message\":\"Access denied\", \"path\":\"" + request.getRequestURI() + "\"}");
                        })
                )
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(authenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .httpBasic(Customizer.withDefaults())
                .build();
    }
}
