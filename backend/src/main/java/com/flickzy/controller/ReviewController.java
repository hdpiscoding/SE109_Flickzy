package com.flickzy.controller;

import com.flickzy.base.BaseController;
import com.flickzy.dto.ReviewDTO;
import com.flickzy.service.interfaces.JwtService;
import com.flickzy.service.interfaces.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/reviews")
@RequiredArgsConstructor
public class ReviewController extends BaseController {
    private final ReviewService reviewService;
    private final JwtService jwtService;

    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    @PostMapping("/{movieId}")
    public ResponseEntity<Object> createReview(@RequestHeader("Authorization") String authHeader, @PathVariable UUID movieId, @RequestBody ReviewDTO reviewDTO) {
        UUID userId = jwtService.extractUserId(authHeader.substring(7));
        return buildResponse(reviewService.createReview(userId, movieId, reviewDTO), HttpStatus.CREATED, "Review created successfully");
    }

    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateReview(@PathVariable UUID id, @RequestBody ReviewDTO reviewDTO) {
        return buildResponse(reviewService.updateReview(id, reviewDTO), HttpStatus.OK, "Review updated successfully");
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteReview(@PathVariable UUID id) {
        reviewService.deleteReview(id);
        return buildResponse(null, HttpStatus.OK, "Review deleted successfully");
    }

    @GetMapping("/{movieId}")
    public ResponseEntity<Object> getAllReviewsByMovie(@PathVariable UUID movieId, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int limit) {
        return buildResponse(reviewService.getAllReviewsByMovie(movieId, page, limit), HttpStatus.OK, "Reviews retrieved successfully");
    }

    @GetMapping("/me/{movieId}/is-reviewed")
    public ResponseEntity<Object> isUserReviewed(@RequestHeader("Authorization") String authHeader, @PathVariable UUID movieId) {
        UUID userId = jwtService.extractUserId(authHeader.substring(7));
        Map<String, Boolean> data = new HashMap<>();
        data.put("isReviewed", reviewService.isUserReviewed(userId, movieId));
        return buildResponse(data, HttpStatus.OK, "User review status retrieved successfully");
    }

    @GetMapping("/me/{movieId}/can-review")
    public ResponseEntity<Object> canUserReview(@RequestHeader("Authorization") String authHeader, @PathVariable UUID movieId) {
        UUID userId = jwtService.extractUserId(authHeader.substring(7));
        Map<String, Boolean> data = new HashMap<>();
        data.put("canReview", reviewService.canUserReview(userId, movieId));
        return buildResponse(data, HttpStatus.OK, "User review permission retrieved successfully");
    }
}
