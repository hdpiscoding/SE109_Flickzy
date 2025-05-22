package com.flickzy.repository;

import com.flickzy.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

/**
 * Repository for Room entities.
 */
@Repository
public interface RoomRepository extends JpaRepository<Room, UUID> {
}