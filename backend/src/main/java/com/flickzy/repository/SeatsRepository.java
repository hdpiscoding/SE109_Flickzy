package com.flickzy.repository;

import com.flickzy.entity.Seats;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface SeatsRepository extends JpaRepository<Seats, UUID> {
}
