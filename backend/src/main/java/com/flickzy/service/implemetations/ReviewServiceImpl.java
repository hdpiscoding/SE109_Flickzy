package com.flickzy.service.implemetations;

import com.flickzy.dto.ReviewDTO;
import com.flickzy.service.interfaces.ReviewService;

import java.util.List;
import java.util.Map;
import java.util.UUID;

public class ReviewServiceImpl implements ReviewService {
    @Override
    public ReviewDTO createReview(ReviewDTO review) {
        return null;
    }

    @Override
    public ReviewDTO updateReview(ReviewDTO review) {
        return null;
    }

    @Override
    public void deleteReview(UUID id) {

    }

    @Override
    public List<ReviewDTO> getAllReviews(Map<String, Object> filters) {
        return List.of();
    }
}
