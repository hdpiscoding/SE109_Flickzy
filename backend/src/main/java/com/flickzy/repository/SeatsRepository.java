package com.flickzy.repository;

import com.flickzy.entity.Seats;
import com.flickzy.projection.SeatProjection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SeatsRepository extends JpaRepository<Seats, UUID> {
List<SeatProjection> findByRoom_RoomId(UUID roomId);
}