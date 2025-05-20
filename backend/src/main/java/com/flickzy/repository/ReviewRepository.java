package com.flickzy.repository;

import com.flickzy.entity.Reviews;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ReviewRepository extends JpaRepository<Reviews, UUID> {
    boolean existsByMovie_IdAndUser_Id(UUID movieId, UUID userId);
    Page<Reviews> findByMovie_Id(UUID movieId, Pageable pageable);
    @Query("SELECT AVG(r.star) FROM Reviews r WHERE r.movie.id = :movieId")
    Double findAverageRatingByMovie_Id(@Param("movieId") UUID movieId);
    @Query("SELECT CASE WHEN COUNT(b) > 0 THEN true ELSE false END FROM Booking b WHERE b.user.id = :userId AND b.schedule.movie.id = :movieId")
    boolean canUserReview(@Param("userId") UUID userId,
                          @Param("movieId") UUID movieId);
}
