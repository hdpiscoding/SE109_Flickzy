package com.flickzy.repository;

import com.flickzy.entity.MovieShowing;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface MovieShowingRepository extends JpaRepository<MovieShowing, UUID> {
    List<MovieShowing> findByMovieId(UUID movieId);
}
