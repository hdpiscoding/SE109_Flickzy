package com.flickzy.service.interfaces;

import com.flickzy.dto.ReviewDTO;

import java.util.List;
import java.util.Map;
import java.util.UUID;

public interface ReviewService {
    ReviewDTO createReview(ReviewDTO review);
    ReviewDTO updateReview(ReviewDTO review);
    void deleteReview(UUID id);
    List<ReviewDTO> getAllReviews(Map<String, Object> filters);
}
