package com.flickzy.service.interfaces;

import com.flickzy.dto.ReviewSummaryRequestDTO;
import com.flickzy.dto.ReviewSummaryResponseDTO;

public interface ReviewSummaryService {
    ReviewSummaryResponseDTO summarizeReviews(ReviewSummaryRequestDTO request);
}