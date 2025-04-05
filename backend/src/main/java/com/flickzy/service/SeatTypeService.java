// SeatTypeService.java
package com.flickzy.service;

import com.flickzy.entity.SeatType;
import com.flickzy.repository.SeatTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SeatTypeService {
    private final SeatTypeRepository seatTypeRepository;

    public List<SeatType> getAllSeatTypes() {
        return seatTypeRepository.findAll();
    }

    public Optional<SeatType> getSeatTypeById(UUID id) {
        return seatTypeRepository.findById(id);
    }

    public SeatType createSeatType(SeatType seatType) {
        return seatTypeRepository.save(seatType);
    }

    public SeatType updateSeatType(UUID id, SeatType seatTypeDetails) {
        return seatTypeRepository.findById(id).map(seatType -> {
            seatType.setWidth(seatTypeDetails.getWidth());
            seatType.setHeight(seatTypeDetails.getHeight());
            seatType.setColor(seatTypeDetails.getColor());
            return seatTypeRepository.save(seatType);
        }).orElseThrow(() -> new RuntimeException("SeatType not found"));
    }

    public void deleteSeatType(UUID id) {
        seatTypeRepository.deleteById(id);
    }
}
