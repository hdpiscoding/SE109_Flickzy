package com.flickzy.controller;

import com.flickzy.base.BaseController;
import com.flickzy.dto.ReviewSummaryRequestDTO;
import com.flickzy.dto.ReviewSummaryResponseDTO;
import com.flickzy.service.interfaces.ReviewSummaryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ReviewSummaryController extends BaseController {
    private final ReviewSummaryService reviewSummaryService;

    @PostMapping("/reviews/summary")
    public ResponseEntity<Object> summarizeReviews(@Valid @RequestBody ReviewSummaryRequestDTO request) {
        ReviewSummaryResponseDTO response = reviewSummaryService.summarizeReviews(request);
        return buildResponse(response, HttpStatus.OK, "Review summary generated successfully");
    }
}