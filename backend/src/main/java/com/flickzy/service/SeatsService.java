package com.flickzy.service;

import com.flickzy.entity.Seats;
import com.flickzy.repository.SeatsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SeatsService {

    private final SeatsRepository seatsRepository;

    public List<Seats> getAllSeats() {
        return seatsRepository.findAll();
    }

    public Seats getSeatById(UUID seatId) {
        return seatsRepository.findById(seatId)
                .orElseThrow(() -> new RuntimeException("Seat not found with id: " + seatId));
    }

    public Seats createSeat(Seats seat) {
        return seatsRepository.save(seat);
    }

    public Seats updateSeat(UUID seatId, Seats seat) {
        Seats existingSeat = getSeatById(seatId);
        existingSeat.setRow(seat.getRow());
        existingSeat.setColumnn(seat.getColumnn());
        existingSeat.setName(seat.getName());
        existingSeat.setRoom(seat.getRoom());
        existingSeat.setSeatTypeId(seat.getSeatTypeId());
        return seatsRepository.save(existingSeat);
    }

    public void deleteSeat(UUID seatId) {
        seatsRepository.deleteById(seatId);
    }
}
