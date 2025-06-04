package com.flickzy.repository;

import com.flickzy.entity.CinemaBrand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

/**
 * Repository for CinemaBrand entities.
 */
@Repository
public interface CinemaBrandRepository extends JpaRepository<CinemaBrand, UUID> {
    
}