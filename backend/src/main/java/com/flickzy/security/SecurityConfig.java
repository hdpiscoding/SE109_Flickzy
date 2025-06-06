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
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

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
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(auth -> auth
                        // Public APIs (unauthenticated)
                        .requestMatchers("/error").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/v1/payment/momo").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/v1/payment/callback").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/v1/auth/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/rooms").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/v1/reviews/summary").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/rooms/{id}").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/seats/room/{id}").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/brands").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/brands/{id}").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/v1/brands").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/genres").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/v1/movies/filter").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/movies/{id}").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/movie-showings").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/reviews/{movieId}").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/movie-showings/movies/{movieId}").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/v1/schedule-by-cinema").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/v1/schedule-by-movie").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/cinemas").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/cinemas/{id}").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/snacks/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/v1/bookings/send-email").permitAll()
                        // User APIs
                        .requestMatchers("/api/v1/users/me/**").hasAnyAuthority("USER", "ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/v1/bookings/me").hasAnyAuthority("USER", "ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/v1/booking").hasAnyAuthority("USER", "ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/v1/booking-by-schedule/{id}").permitAll()

                        .requestMatchers(HttpMethod.GET, "/api/v1/brands").permitAll()

                        // Admin APIs
                        .requestMatchers( "/api/v1/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/v1/rooms").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/v1/rooms").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/rooms").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/v1/genres").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/reviews/{id}").hasAuthority("ADMIN")
                        .requestMatchers("/api/v1/movies").hasAuthority("ADMIN")
                        .requestMatchers("/api/v1/genres/**").hasAuthority("ADMIN")
                        .requestMatchers("/api/v1/movies/**").hasAuthority("ADMIN")
                        .requestMatchers("/api/v1/movie-showings/**").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/v1/schedule").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/v1/schedule/**").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/schedule/**").hasAuthority("ADMIN")
                        // Thêm vào phần authorizeHttpRequests
                        .requestMatchers(HttpMethod.POST, "/api/v1/blogs").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/blog/{id}").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/v1/blog").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/v1/blog/{id}").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/blog/{id}").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/v1/snacks").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/v1/snacks/{id}").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/api/v1/snacks/{id}/delete").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/api/v1/snacks/{id}/availability").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/v1/schedules").hasAuthority("ADMIN")
                        // Default APIs
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


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of(
                "http://localhost:3000",
                    "http://localhost:3001",
            "https://db67-2a09-bac5-d46c-2646-00-3d0-10.ngrok-free.app" // Thay bằng link ngrok của bạn
        ));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
