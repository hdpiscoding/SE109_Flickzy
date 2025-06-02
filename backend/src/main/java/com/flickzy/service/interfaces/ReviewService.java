package com.flickzy.service.interfaces;

import com.flickzy.dto.PaginatedResponse;
import com.flickzy.dto.ReviewDTO;

import java.util.List;
import java.util.Map;
import java.util.UUID;

public interface ReviewService {
    ReviewDTO createReview(UUID userId, UUID movieId, ReviewDTO review);
    ReviewDTO updateReview(UUID id, ReviewDTO review);
    void deleteReview(UUID id);
    PaginatedResponse<ReviewDTO> getAllReviewsByMovie(UUID movieId, int page, int limit);
    Boolean isUserReviewed(UUID userId, UUID movieId);
    Boolean canUserReview(UUID userId, UUID movieId);
}
