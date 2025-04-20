package com.flickzy.utils.specifications;

import com.flickzy.entity.Genres;
import com.flickzy.entity.MovieShowing;
import com.flickzy.entity.Movies;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;

public class MovieSpecification {
    public static Specification<Movies> hasName(String name) {
        return (root, query, cb) ->
                name == null ? null : cb.like(cb.lower(root.get("name")), "%" + name.toLowerCase() + "%");
    }

    public static Specification<Movies> hasGenreName(String genreName) {
        return (root, query, cb) -> {
            if (genreName == null || genreName.isEmpty()) return null;

            Join<Movies, Genres> genres = root.join("genres");
            return cb.equal(cb.lower(genres.get("name")), genreName.toLowerCase());
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
