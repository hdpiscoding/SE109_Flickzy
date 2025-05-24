package com.flickzy.specification;

import com.flickzy.entity.Booking;
import org.springframework.data.jpa.domain.Specification;

import java.util.UUID;

public class BookingSpecifications {

    public static Specification<Booking> byUserId(UUID userId) {
        return (root, query, criteriaBuilder) -> {
            query.distinct(true);
            return criteriaBuilder.equal(root.get("user").get("id"), userId);
        };
    }

    public static Specification<Booking> byScheduleAndSeat(UUID scheduleId, UUID seatId) {
        return (root, query, criteriaBuilder) -> {
            query.distinct(true);
            var predicates = criteriaBuilder.conjunction();
            predicates = criteriaBuilder.and(predicates,
                    criteriaBuilder.equal(root.get("schedule").get("scheduleId"), scheduleId));
            predicates = criteriaBuilder.and(predicates, criteriaBuilder.equal(root.get("seat").get("seatId"), seatId));
            predicates = criteriaBuilder.and(predicates, criteriaBuilder.equal(root.get("seatStatus"), 1)); // CONFIRMED
            return predicates;
        };
    }
    public static Specification<Booking> byScheduleId(UUID scheduleId) {
        return (root, query, criteriaBuilder) -> {
            query.distinct(true);
            return criteriaBuilder.equal(root.get("schedule").get("scheduleId"), scheduleId);
        };
    }
}