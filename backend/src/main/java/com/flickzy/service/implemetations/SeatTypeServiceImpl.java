package com.flickzy.service.implemetations;

import com.flickzy.dto.PaginatedResponse;
import com.flickzy.dto.SeatTypeDTO;
import com.flickzy.entity.SeatType;
import com.flickzy.exception.SeatTypeNotFoundException;
import com.flickzy.repository.SeatTypeRepository;
import com.flickzy.service.interfaces.SeatTypeService;
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
 * Implementation of SeatTypeService for managing seat type entities.
 */
@Service
@RequiredArgsConstructor
public class SeatTypeServiceImpl implements SeatTypeService {

    private final SeatTypeRepository seatTypeRepository;

    /**
     * Creates a new seat type.
     *
     * @param seatTypeDTO The DTO containing seat type details
     * @return Created SeatTypeDTO
     */
    @Override
    @Transactional
    public SeatTypeDTO createSeatType(@Valid SeatTypeDTO seatTypeDTO) {
        SeatType seatType = toEntity(seatTypeDTO);
        SeatType savedSeatType = seatTypeRepository.save(seatType);
        return toDTO(savedSeatType);
    }

    /**
     * Updates an existing seat type.
     *
     * @param seatTypeId  The UUID of the seat type
     * @param seatTypeDTO The DTO containing updated details
     * @return Updated SeatTypeDTO
     * @throws SeatTypeNotFoundException if the seat type is not found
     */
    @Override
    @Transactional
    public SeatTypeDTO updateSeatType(@NotNull UUID seatTypeId, @Valid SeatTypeDTO seatTypeDTO) {
        return seatTypeRepository.findById(seatTypeId)
                .map(seatType -> {
                    if (seatTypeDTO.getName() != null) {
                        seatType.setName(seatTypeDTO.getName());
                    }
                    if (seatTypeDTO.getWidth() != null) {
                        seatType.setWidth(seatTypeDTO.getWidth());
                    }
                    if (seatTypeDTO.getHeight() != null) {
                        seatType.setHeight(seatTypeDTO.getHeight());
                    }
                    if (seatTypeDTO.getPrice() != null) {
                        seatType.setPrice(seatTypeDTO.getPrice());
                    }
                    if (seatTypeDTO.getDescription() != null) {
                        seatType.setDescription(seatTypeDTO.getDescription());
                    }
                    if (seatTypeDTO.getColor() != null) {
                        seatType.setColor(seatTypeDTO.getColor());
                    }
                    return toDTO(seatTypeRepository.save(seatType));
                })
                .orElseThrow(() -> new SeatTypeNotFoundException(seatTypeId));
    }

    /**
     * Deletes a seat type by ID.
     *
     * @param seatTypeId The UUID of the seat type
     * @throws SeatTypeNotFoundException if the seat type is not found
     */
    @Override
    @Transactional
    public void deleteSeatType(@NotNull UUID seatTypeId) {
        if (!seatTypeRepository.existsById(seatTypeId)) {
            throw new SeatTypeNotFoundException(seatTypeId);
        }
        seatTypeRepository.deleteById(seatTypeId);
    }

    /**
     * Retrieves all seat types with pagination.
     *
     * @param page  The page number (optional, defaults to 1)
     * @param limit The number of items per page (optional, defaults to 10)
     * @return PaginatedResponse containing SeatTypeDTOs
     */
    @Override
    @Transactional(readOnly = true)
    public PaginatedResponse<SeatTypeDTO> getAllSeatTypes(Integer page, Integer limit) {
        int pageNumber = (page != null && page > 0) ? page - 1 : 0;
        int pageSize = (limit != null && limit > 0) ? limit : 10;
        Pageable pageable = PageRequest.of(pageNumber, pageSize);

        Page<SeatType> seatTypePage = seatTypeRepository.findAll(pageable);
        List<SeatTypeDTO> seatTypeDTOs = seatTypePage.getContent().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());

        return PaginatedResponse.<SeatTypeDTO>builder()
                .data(seatTypeDTOs)
                .page(pageNumber + 1)
                .limit(pageSize)
                .totalElements(seatTypePage.getTotalElements())
                .totalPages(seatTypePage.getTotalPages())
                .lastPage(seatTypePage.isLast())
                .build();
    }

    /**
     * Retrieves a seat type by ID.
     *
     * @param seatTypeId The UUID of the seat type
     * @return SeatTypeDTO
     * @throws SeatTypeNotFoundException if the seat type is not found
     */
    @Override
    @Transactional(readOnly = true)
    public SeatTypeDTO getSeatTypeById(@NotNull UUID seatTypeId) {
        return seatTypeRepository.findById(seatTypeId)
                .map(this::toDTO)
                .orElseThrow(() -> new SeatTypeNotFoundException(seatTypeId));
    }

    private SeatTypeDTO toDTO(SeatType seatType) {
        return SeatTypeDTO.builder()
                .seatTypeId(seatType.getSeatTypeId())
                .name(seatType.getName())
                .width(seatType.getWidth())
                .height(seatType.getHeight())
                .price(seatType.getPrice())
                .description(seatType.getDescription())
                .color(seatType.getColor())
                .build();
    }

    private SeatType toEntity(SeatTypeDTO seatTypeDTO) {
        return SeatType.builder()
                .name(seatTypeDTO.getName())
                .width(seatTypeDTO.getWidth())
                .height(seatTypeDTO.getHeight())
                .price(seatTypeDTO.getPrice())
                .description(seatTypeDTO.getDescription())
                .color(seatTypeDTO.getColor())
                .build();
    }
}