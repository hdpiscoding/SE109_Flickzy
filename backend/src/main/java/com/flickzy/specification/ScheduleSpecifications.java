package com.flickzy.specification;

import com.flickzy.entity.Cinemas;
import com.flickzy.entity.Movies;
import com.flickzy.entity.Room;
import com.flickzy.entity.Schedule;
import jakarta.persistence.criteria.Join;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.util.UUID;

public class ScheduleSpecifications {

    public static Specification<Schedule> byCinemaAndDate(String cinemaId, LocalDate date) {
        return (root, query, criteriaBuilder) -> {
            query.distinct(true);
            Join<Schedule, Room> roomJoin = root.join("room");
            Join<Room, Cinemas> cinemaJoin = roomJoin.join("cinema");

            var predicates = criteriaBuilder.conjunction();
            predicates = criteriaBuilder.and(predicates, criteriaBuilder.equal(root.get("scheduleDate"), date));

            if (!"All".equals(cinemaId)) {
                predicates = criteriaBuilder.and(predicates, criteriaBuilder.equal(cinemaJoin.get("id"), UUID.fromString(cinemaId)));
            }

            return predicates;
        };
    }

    public static Specification<Schedule> byMovieAndDateAndProvince(UUID movieId, LocalDate date, String province) {
        return (root, query, criteriaBuilder) -> {
            query.distinct(true);
            Join<Schedule, Movies> movieJoin = root.join("movie");
            Join<Schedule, Room> roomJoin = root.join("room");
            Join<Room, Cinemas> cinemaJoin = roomJoin.join("cinema");

            var predicates = criteriaBuilder.conjunction();
            predicates = criteriaBuilder.and(predicates, criteriaBuilder.equal(movieJoin.get("id"), movieId));
            predicates = criteriaBuilder.and(predicates, criteriaBuilder.equal(root.get("scheduleDate"), date));
            predicates = criteriaBuilder.and(predicates, criteriaBuilder.equal(cinemaJoin.get("province"), province));

            return predicates;
        };
    }
}