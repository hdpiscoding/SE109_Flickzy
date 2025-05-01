package com.flickzy.repository;

import com.flickzy.entity.Reviews;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ReviewRepository extends JpaRepository<Reviews, UUID> {
    boolean existsByMovie_IdAndUser_Id(UUID movieId, UUID userId);
    Page<Reviews> findByMovie_Id(UUID movieId, Pageable pageable);
}
