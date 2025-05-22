package com.flickzy.service.implemetations;

import com.flickzy.dto.RoomDTO;
import com.flickzy.dto.PaginatedResponse;
import com.flickzy.entity.Cinemas;
import com.flickzy.entity.Room;
import com.flickzy.exception.RoomNotFoundException;
import com.flickzy.repository.CinemasRepository;
import com.flickzy.repository.RoomRepository;
import com.flickzy.service.interfaces.RoomService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Implementation of RoomService for managing room entities.
 */
@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;
    private final CinemasRepository cinemaRepository;

    /**
     * Creates a new room.
     *
     * @param roomDTO The DTO containing room details
     * @return Created RoomDTO
     */
    @Override
    @Transactional
    public RoomDTO createRoom(@Valid RoomDTO roomDTO) {
        Room room = toEntity(roomDTO);
        Room savedRoom = roomRepository.save(room);
        return toDTO(savedRoom);
    }

    /**
     * Updates an existing room.
     *
     * @param roomId  The UUID of the room
     * @param roomDTO The DTO containing updated details
     * @return Updated RoomDTO
     * @throws RoomNotFoundException if the room is not found
     */
    @Override
    @Transactional
    public RoomDTO updateRoom(@NotNull UUID roomId, @Valid RoomDTO roomDTO) {
        return roomRepository.findById(roomId)
                .map(room -> {
                    room.setRoomName(roomDTO.getRoomName());
                    room.setRoomType(roomDTO.getRoomType());
                    room.setWidth(roomDTO.getWidth());
                    room.setHeight(roomDTO.getHeight());
                    if (roomDTO.getCinemaId() != null) {
                        Cinemas cinema = cinemaRepository.findById(roomDTO.getCinemaId())
                                .orElseThrow(() -> new IllegalArgumentException("Cinema not found with id: " + roomDTO.getCinemaId()));
                        room.setCinema(cinema);
                    }
                    return toDTO(roomRepository.save(room));
                })
                .orElseThrow(() -> new RoomNotFoundException(roomId));
    }
    /**
     * Deletes a room by ID.
     *
     * @param roomId The UUID of the room
     * @throws RoomNotFoundException if the room is not found
     */
    @Override
    @Transactional
    public void deleteRoom(@NotNull UUID roomId) {
        if (!roomRepository.existsById(roomId)) {
            throw new RoomNotFoundException(roomId);
        }
        roomRepository.deleteById(roomId);
    }

    /**
     * Retrieves all rooms with pagination.
     *
     * @param page  The page number (optional, defaults to 1)
     * @param limit The number of items per page (optional, defaults to 10)
     * @return PaginatedResponse containing RoomDTOs
     */
    @Override
    @Transactional(readOnly = true)
    public PaginatedResponse<RoomDTO> getAllRooms(Integer page, Integer limit) {
        int pageNumber = (page != null && page > 0) ? page - 1 : 0;
        int pageSize = (limit != null && limit > 0) ? limit : 10;
        Pageable pageable = PageRequest.of(pageNumber, pageSize);

        Page<Room> roomPage = roomRepository.findAll(pageable);
        List<RoomDTO> roomDTOs = roomPage.getContent().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());

        return PaginatedResponse.<RoomDTO>builder()
                .data(roomDTOs)
                .page(pageNumber + 1)
                .limit(pageSize)
                .totalElements(roomPage.getTotalElements())
                .totalPages(roomPage.getTotalPages())
                .lastPage(roomPage.isLast())
                .build();
    }

    /**
     * Retrieves a room by ID.
     *
     * @param roomId The UUID of the room
     * @return RoomDTO
     * @throws RoomNotFoundException if the room is not found
     */
    @Override
    @Transactional(readOnly = true)
    public RoomDTO getRoomById(@NotNull UUID roomId) {
        return roomRepository.findById(roomId)
                .map(this::toDTO)
                .orElseThrow(() -> new RoomNotFoundException(roomId));
    }

    private RoomDTO toDTO(Room room) {
        return RoomDTO.builder()
                .roomId(room.getRoomId())
                .cinemaId(room.getCinema() != null ? room.getCinema().getId() : null)
                .roomName(room.getRoomName())
                .roomType(room.getRoomType())
                .width(room.getWidth())
                .height(room.getHeight())
                .build();
    }

    private Room toEntity(RoomDTO roomDTO) {
        Cinemas cinema = cinemaRepository.findById(roomDTO.getCinemaId())
                .orElseThrow(() -> new IllegalArgumentException("Cinema not found with id: " + roomDTO.getCinemaId()));
        return Room.builder()
                .roomName(roomDTO.getRoomName())
                .roomType(roomDTO.getRoomType())
                .width(roomDTO.getWidth())
                .height(roomDTO.getHeight())
                .cinema(cinema)
                .build();
    }
}