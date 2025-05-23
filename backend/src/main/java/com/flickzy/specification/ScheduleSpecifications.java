package com.flickzy.specification;

import com.flickzy.entity.Cinemas;
import com.flickzy.entity.Movies;
import com.flickzy.entity.Room;
import com.flickzy.entity.Schedule;
import com.flickzy.entity.ScheduleType;
import jakarta.persistence.criteria.Join;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.util.UUID;

public class ScheduleSpecifications {

    public static Specification<Schedule> byCinemaAndDate(String cinemaId, LocalDate date, UUID scheduleTypeId) {
        return (root, query, criteriaBuilder) -> {
            query.distinct(true);
            Join<Schedule, Room> roomJoin = root.join("room");
            Join<Room, Cinemas> cinemaJoin = roomJoin.join("cinema");
            Join<Schedule, ScheduleType> typeJoin = root.join("type"); // Thêm join với ScheduleType

            var predicates = criteriaBuilder.conjunction();
            predicates = criteriaBuilder.and(predicates, criteriaBuilder.equal(root.get("scheduleDate"), date));

            if (!"All".equals(cinemaId)) {
                predicates = criteriaBuilder.and(
                        predicates,
                        criteriaBuilder.equal(cinemaJoin.get("id"), UUID.fromString(cinemaId))
                );
            }

            // Lọc theo scheduleTypeId nếu không null
            if (scheduleTypeId != null) {
                predicates = criteriaBuilder.and(
                        predicates,
                        criteriaBuilder.equal(typeJoin.get("id"), scheduleTypeId)
                );
            }

            return predicates;
        };
    }

    public static Specification<Schedule> byMovieAndDateAndBrandAndProvince(
            UUID movieId, LocalDate date, UUID cinemaBrandId, String province, UUID scheduleTypeId) {
        return (root, query, criteriaBuilder) -> {
            query.distinct(true);
            var predicates = criteriaBuilder.conjunction();
            Join<Schedule, ScheduleType> typeJoin = root.join("type"); // Thêm join với ScheduleType

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

            // Filter by scheduleTypeId (if provided)
            if (scheduleTypeId != null) {
                predicates = criteriaBuilder.and(
                        predicates,
                        criteriaBuilder.equal(typeJoin.get("id"), scheduleTypeId)
                );
            }

            return predicates;
        };
    }
}