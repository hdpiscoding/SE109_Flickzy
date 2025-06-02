package com.flickzy.service.implemetations;

import com.flickzy.client.GeminiClient;
import com.flickzy.dto.ReviewSummaryRequestDTO;
import com.flickzy.dto.ReviewSummaryResponseDTO;
import com.flickzy.entity.Movies;
import com.flickzy.repository.MovieRepository;
import com.flickzy.service.interfaces.ReviewSummaryService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class ReviewSummaryServiceImpl implements ReviewSummaryService {
    private static final Logger logger = LoggerFactory.getLogger(ReviewSummaryServiceImpl.class);
    private final MovieRepository movieRepository;
    private final GeminiClient geminiClient;

    @Override
    public ReviewSummaryResponseDTO summarizeReviews(ReviewSummaryRequestDTO request) {
        logger.info("Summarizing reviews for movieId: {}", request.getMovieId());

        // Validate movie existence
        Movies movie = movieRepository.findById(request.getMovieId())
                .orElseThrow(() -> {
                    logger.error("Movie not found: {}", request.getMovieId());
                    return new EntityNotFoundException("Movie not found");
                });

        // Validate reviews
        if (request.getReviews().isEmpty()) {
            logger.error("No reviews provided for movieId: {}", request.getMovieId());
            throw new IllegalArgumentException("Reviews cannot be empty");
        }

        // Calculate average rating
        double averageRating = request.getReviews().stream()
                .mapToInt(ReviewSummaryRequestDTO.ReviewDTO::getStar)
                .average()
                .orElse(0.0);
        averageRating = Math.round(averageRating * 10.0) / 10.0;

        // Build prompt
        StringBuilder reviewsText = new StringBuilder();
        for (ReviewSummaryRequestDTO.ReviewDTO review : request.getReviews()) {
            reviewsText.append(String.format("Review: \"%s\" (%d/5 stars)\n", review.getContent(), review.getStar()));
        }

        String prompt = String.format(
                "You are an expert movie review summarizer tasked with analyzing a dataset of user reviews for a specific movie, including both the textual content of the reviews and their associated star ratings (ranging from 0 to 5 stars), along with a provided plot summary of the movie. Your goal is to generate a concise, clear, and balanced summary in Vietnamese that captures the overall sentiment and key points from the reviews, integrating relevant aspects of the plot summary to provide context. This summary should help a potential viewer quickly decide whether to watch the movie by highlighting the movie’s strengths, weaknesses, and overall reception, without spoiling major plot details unless explicitly mentioned in the reviews.\n\n" +
                "Input Data:\n\n" +
                "Movie Plot Summary: %s\n" +
                "Reviews:\n%s\n\n" +
                "Instructions:\n" +
                "- Analyze the Reviews:\n" +
                "  - Identify the overall sentiment (positive, negative, or mixed).\n" +
                "  - Calculate the average star rating (rounded to one decimal place).\n" +
                "  - Extract common themes or recurring points.\n" +
                "  - Highlight specific strengths and weaknesses.\n" +
                "  - Note any polarizing aspects.\n" +
                "- Incorporate the Plot Summary:\n" +
                "  - Use the plot summary to contextualize the reviews.\n" +
                "  - Connect review points to relevant plot elements.\n" +
                "  - Avoid spoilers unless mentioned in reviews.\n" +
                "- Generate a Concise Summary:\n" +
                "  - Write a summary of 100–150 words in Vietnamese.\n" +
                "  - Start with a brief statement about the movie’s genre and premise.\n" +
                "  - Follow with the overall sentiment and average star rating.\n" +
                "  - Highlight key strengths and weaknesses.\n" +
                "  - Mention polarizing aspects.\n" +
                "  - Conclude with a recommendation.\n" +
                "- Constraints:\n" +
                "  - Do not invent details.\n" +
                "  - Avoid spoilers unless mentioned.\n" +
                "  - Summary length: 100–150 words.\n" +
                "  - Ensure neutral, objective tone.\n\n" +
                "Output Format:\n" +
                "Provide the summary in a single paragraph in Vietnamese.\n" +
                "Include the average star rating in the summary.\n" +
                "Include a one-sentence recommendation at the end.",
                movie.getMovieContent() != null ? movie.getMovieContent() : "No plot summary available.",
                reviewsText.toString()
        );

        // Call Gemini API
        String summary = geminiClient.generateSummary(prompt);

        return new ReviewSummaryResponseDTO(summary, averageRating);
    }
}