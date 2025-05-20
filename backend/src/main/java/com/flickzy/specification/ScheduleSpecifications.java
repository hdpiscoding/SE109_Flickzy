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

    public static Specification<Schedule> byMovieAndDateAndBrandAndProvince(
            UUID movieId, LocalDate date, UUID cinemaBrandId, String province) {
        return (root, query, criteriaBuilder) -> {
            query.distinct(true);
            var predicates = criteriaBuilder.conjunction();

            // Filter by movieId
            predicates = criteriaBuilder.and(
                    predicates,
                    criteriaBuilder.equal(root.get("movie").get("id"), movieId)
            );

            // Filter by date
            predicates = criteriaBuilder.and(
                    predicates,
                    criteriaBuilder.equal(root.get("scheduleDate"), date)
            );

            // Filter by cinemaBrandId (if provided)
            if (cinemaBrandId != null) {
                predicates = criteriaBuilder.and(
                        predicates,
                        criteriaBuilder.equal(
                                root.get("room").get("cinema").get("cinemaBrand").get("id"),
                                cinemaBrandId
                        )
                );
            }

            // Filter by province (if provided)
            if (province != null && !province.isEmpty()) {
                predicates = criteriaBuilder.and(
                        predicates,
                        criteriaBuilder.equal(root.get("room").get("cinema").get("province"), province)
                );
            }

            return predicates;
        };
    }
}