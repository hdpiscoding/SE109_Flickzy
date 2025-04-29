package com.flickzy.service.implemetations;

import com.flickzy.dto.PaginatedResponse;
import com.flickzy.dto.ReviewDTO;
import com.flickzy.entity.Movies;
import com.flickzy.entity.Reviews;
import com.flickzy.entity.Users;
import com.flickzy.mapper.ReviewMapper;
import com.flickzy.repository.MovieRepository;
import com.flickzy.repository.ReviewRepository;
import com.flickzy.repository.UserRepository;
import com.flickzy.service.interfaces.ReviewService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class ReviewServiceImpl implements ReviewService {
    private final ReviewRepository reviewRepository;
    private final MovieRepository movieRepository;
    private final ReviewMapper reviewMapper;
    private final UserRepository userRepository;

    @Override
    public ReviewDTO createReview(UUID userId, UUID movieId, ReviewDTO review) {
        if (reviewRepository.existsByMovie_IdAndUser_Id(movieId, userId)) {
            throw new IllegalArgumentException("You have already reviewed this movie!");
        }
        Users user = userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException("User not found!"));
        Movies movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new EntityNotFoundException("Movie not found!"));
        Reviews newReview = Reviews
                .builder()
                .user(user)
                .star(review.getStar())
                .content(review.getContent())
                .movie(movie)
                .build();
        return reviewMapper.toDto(reviewRepository.save(newReview));
    }

    @Override
    public ReviewDTO updateReview(UUID id, ReviewDTO review) {
        Reviews r = reviewRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Review not found!"));
        if(review.getStar() != null) {
            r.setStar(review.getStar());
        }
        if(review.getContent() != null) {
            r.setContent(review.getContent());
        }
        return reviewMapper.toDto(reviewRepository.save(r));
    }

    @Override
    public void deleteReview(UUID id) {
        reviewRepository.deleteById(id);
    }

    @Override
    public PaginatedResponse<ReviewDTO> getAllReviewsByMovie(UUID movieId, int page, int limit) {
        PageRequest pageRequest = PageRequest.of(page - 1, limit);
        Page<Reviews> reviews = reviewRepository.findByMovie_Id(movieId, pageRequest);
        return new PaginatedResponse<>(
                reviewMapper.toDtoList(reviews.getContent()),
                reviews.getNumber() + 1,
                reviews.getSize(),
                reviews.getTotalElements(),
                reviews.getTotalPages(),
                reviews.isLast()
        );
    }
}
