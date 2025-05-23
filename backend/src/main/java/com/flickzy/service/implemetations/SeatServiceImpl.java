package com.flickzy.service.implemetations;

import com.flickzy.dto.PaginatedResponse;
import com.flickzy.dto.SeatDTO;
import com.flickzy.entity.Room;
import com.flickzy.entity.Seats;
import com.flickzy.entity.SeatType;
import com.flickzy.exception.SeatNotFoundException;
import com.flickzy.projection.SeatProjection;
import com.flickzy.repository.RoomRepository;
import com.flickzy.repository.SeatTypeRepository;
import com.flickzy.repository.SeatsRepository;
import com.flickzy.service.interfaces.SeatsService;
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
 * Implementation of SeatService for managing seat entities.
 */
@Service
@RequiredArgsConstructor
public class SeatServiceImpl implements SeatsService {

    private final SeatsRepository seatsRepository;
    private final RoomRepository roomRepository;
    private final SeatTypeRepository seatTypeRepository;

    /**
     * Creates a new seat.
     *
     * @param seatDTO The DTO containing seat details
     * @return Created SeatDTO
     */
    @Override
    @Transactional
    public SeatDTO createSeat(@Valid SeatDTO seatDTO) {
        Seats seat = toEntity(seatDTO);
        Seats savedSeat = seatsRepository.save(seat);
        return toDTO(savedSeat);
    }

    /**
     * Updates an existing seat.
     *
     * @param seatId  The UUID of the seat
     * @param seatDTO The DTO containing updated details
     * @return Updated SeatDTO
     * @throws SeatNotFoundException if the seat is not found
     */
    @Override
    @Transactional
public SeatDTO updateSeat(@NotNull UUID seatId, @Valid SeatDTO seatUpdateDTO) {
        return seatsRepository.findById(seatId)
                .map(seat -> {
                    // Update only if provided
                    if (seatUpdateDTO.getRow() != null) {
                        seat.setRow(seatUpdateDTO.getRow());
                    }
                    if (seatUpdateDTO.getColumn() != null) {
                        seat.setColumnn(seatUpdateDTO.getColumn());
                    }
                    if (seatUpdateDTO.getPrice() != null) {
                        seat.setPrice(seatUpdateDTO.getPrice());
                    }
                    if (seatUpdateDTO.getName() != null) {
                        seat.setName(seatUpdateDTO.getName());
                    }
                    if (seatUpdateDTO.getRoomId() != null) {
                        Room room = roomRepository.findById(seatUpdateDTO.getRoomId())
                                .orElseThrow(() -> new IllegalArgumentException("Room not found with id: " + seatUpdateDTO.getRoomId()));
                        seat.setRoom(room);
                    }
                    if (seatUpdateDTO.getSeatTypeId() != null) {
                        SeatType seatType = seatTypeRepository.findById(seatUpdateDTO.getSeatTypeId())
                                .orElseThrow(() -> new IllegalArgumentException("SeatType not found with id: " + seatUpdateDTO.getSeatTypeId()));
                        seat.setSeatTypeId(seatType);
                    }
                    return toDTO(seatsRepository.save(seat));
                })
                .orElseThrow(() -> new SeatNotFoundException(seatId));
    }

    /**
     * Deletes a seat by ID.
     *
     * @param seatId The UUID of the seat
     * @throws SeatNotFoundException if the seat is not found
     */
    @Override
    @Transactional
    public void deleteSeat(@NotNull UUID seatId) {
        if (!seatsRepository.existsById(seatId)) {
            throw new SeatNotFoundException(seatId);
        }
        seatsRepository.deleteById(seatId);
    }

    /**
     * Retrieves all seats with pagination.
     *
     * @param page  The page number (optional, defaults to 1)
     * @param limit The number of items per page (optional, defaults to 10)
     * @return PaginatedResponse containing SeatDTOs
     */
    @Override
    @Transactional(readOnly = true)
    public PaginatedResponse<SeatDTO> getAllSeats(Integer page, Integer limit) {
        int pageNumber = (page != null && page > 0) ? page - 1 : 0;
        int pageSize = (limit != null && limit > 0) ? limit : 10;
        Pageable pageable = PageRequest.of(pageNumber, pageSize);

        Page<Seats> seatPage = seatsRepository.findAll(pageable);
        List<SeatDTO> seatDTOs = seatPage.getContent().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());

        return PaginatedResponse.<SeatDTO>builder()
                .data(seatDTOs)
                .page(pageNumber + 1)
                .limit(pageSize)
                .totalElements(seatPage.getTotalElements())
                .totalPages(seatPage.getTotalPages())
                .lastPage(seatPage.isLast())
                .build();
    }

    /**
     * Retrieves a seat by ID.
     *
     * @param seatId The UUID of the seat
     * @return SeatDTO
     * @throws SeatNotFoundException if the seat is not found
     */
    @Override
    @Transactional(readOnly = true)
    public SeatDTO getSeatById(@NotNull UUID seatId) {
        return seatsRepository.findById(seatId)
                .map(this::toDTO)
                .orElseThrow(() -> new SeatNotFoundException(seatId));
    }

    /**
     * Retrieves seats by room ID using projection.
     *
     * @param roomId The UUID of the room
     * @return List of SeatProjection
     */
    @Override
    @Transactional(readOnly = true)
    public List<SeatProjection> getSeatsByRoomId(@NotNull UUID roomId) {
        return seatsRepository.findByRoom_RoomId(roomId);
    }

    private SeatDTO toDTO(Seats seat) {
        return SeatDTO.builder()
                .seatId(seat.getSeatId())
                .seatTypeId(seat.getSeatTypeId().getSeatTypeId())
                .roomId(seat.getRoom().getRoomId())
                .row(seat.getRow())
                .column(seat.getColumnn())
                .price(seat.getPrice())
                .name(seat.getName())
                .build();
    }

    private Seats toEntity(SeatDTO seatDTO) {
        Room room = roomRepository.findById(seatDTO.getRoomId())
                .orElseThrow(() -> new IllegalArgumentException("Room not found with id: " + seatDTO.getRoomId()));
        SeatType seatType = seatTypeRepository.findById(seatDTO.getSeatTypeId())
                .orElseThrow(() -> new IllegalArgumentException("SeatType not found with id: " + seatDTO.getSeatTypeId()));
        return Seats.builder()
                .row(seatDTO.getRow())
                .columnn(seatDTO.getColumn())
                .price(seatDTO.getPrice())
                .name(seatDTO.getName())
                .room(room)
                .seatTypeId(seatType)
                .build();
    }
}