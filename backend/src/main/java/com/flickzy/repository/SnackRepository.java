package com.flickzy.repository;

import com.flickzy.entity.Snack;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

/**
 * Repository for Snack entities.
 */
@Repository
public interface SnackRepository extends JpaRepository<Snack, UUID> {
    Page<Snack> findByIsDeleteFalseAndIsAvailableTrue(Pageable pageable);
    Page<Snack> findByIsDeleteFalseAndIsAvailableTrueAndBrandId(Pageable pageable, UUID brandId);
}