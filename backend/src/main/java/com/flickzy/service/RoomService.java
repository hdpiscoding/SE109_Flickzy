package com.flickzy.service;

import com.flickzy.entity.Room;
import com.flickzy.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RoomService {
    private final RoomRepository roomRepository;

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public Optional<Room> getRoomById(UUID roomId) {
        return roomRepository.findById(roomId);
    }

    public Room createRoom(Room room) {
        return roomRepository.save(room);
    }

    public Room updateRoom(UUID roomId, Room updatedRoom) {
        return roomRepository.findById(roomId).map(room -> {
            room.setRoomName(updatedRoom.getRoomName());
            room.setRoomType(updatedRoom.getRoomType());
            room.setWidth(updatedRoom.getWidth());
            room.setHeight(updatedRoom.getHeight());
            return roomRepository.save(room);
        }).orElseThrow(() -> new RuntimeException("Room not found"));
    }

    public void deleteRoom(UUID roomId) {
        roomRepository.deleteById(roomId);
    }
}