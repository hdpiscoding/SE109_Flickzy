package com.flickzy.utils.specifications;

import com.flickzy.entity.Genres;
import com.flickzy.entity.MovieShowing;
import com.flickzy.entity.Movies;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.util.UUID;

public class MovieSpecification {
    public static Specification<Movies> hasName(String name) {
        return (root, query, cb) ->
                name == null ? null : cb.like(cb.lower(root.get("movieName")), "%" + name.toLowerCase() + "%");
    }

    public static Specification<Movies> hasGenre(UUID genreId) {
        return (root, query, cb) -> {
            if (genreId == null) return null;

            Join<Movies, Genres> genres = root.join("genres");
            return cb.equal(genres.get("id"), genreId);
        };
    }

    public static Specification<Movies> hasYear(Integer year) {
        return (root, query, cb) -> {
            if (year == null || year == 0) return null;

            LocalDate startDate = LocalDate.of(year, 1, 1);
            LocalDate endDate = LocalDate.of(year, 12, 31);

            return cb.between(root.get("movieRelease"), startDate, endDate);
        };
    }

    public static Specification<Movies> isCurrentlyShowing(Boolean isShowing) {
        return (root, query, cb) -> {
            if (isShowing == null) return null;

            LocalDate today = LocalDate.now();
            Join<Movies, MovieShowing> movieShowing = root.join("showings");

            Predicate showingNow = cb.and(
                    cb.lessThanOrEqualTo(movieShowing.get("startDate"), today),
                    cb.greaterThanOrEqualTo(movieShowing.get("endDate"), today)
            );

            if (isShowing) {
                return showingNow;
            } else {
                return cb.not(showingNow);
            }
        };
    }
}
