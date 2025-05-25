package com.flickzy.repository;

import com.flickzy.entity.Cinemas;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CinemasRepository extends JpaRepository<Cinemas, UUID> {
    Page<Cinemas> findAllByCinemaBrand_IdIn(List<UUID> brandIds, Pageable pageable);
}
