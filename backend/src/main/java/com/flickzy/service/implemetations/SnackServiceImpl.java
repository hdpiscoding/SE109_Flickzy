package com.flickzy.service.implemetations;

import com.flickzy.dto.PaginatedResponse;
import com.flickzy.dto.SnackDTO;
import com.flickzy.dto.SnackStatusDTO;
import com.flickzy.entity.Snack;
import com.flickzy.exception.SnackNotFoundException;
import com.flickzy.repository.SnackRepository;
import com.flickzy.service.interfaces.SnackService;
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
 * Implementation of SnackService for managing snack entities.
 */
@Service
@RequiredArgsConstructor
public class SnackServiceImpl implements SnackService {

    private final SnackRepository snackRepository;

    /**
     * Creates a new snack.
     *
     * @param snackDTO The DTO containing snack details
     * @return Created SnackDTO
     */
    @Override
    @Transactional
    public SnackDTO createSnack(@Valid SnackDTO snackDTO) {
        Snack snack = toEntity(snackDTO);
        snack.setBrandId(snackDTO.getBrandId());
        snack.setIsDelete(false);
        snack.setIsAvailable(true);
        Snack savedSnack = snackRepository.save(snack);
        return toDTO(savedSnack);
    }

    /**
     * Updates an existing snack.
     *
     * @param id       The UUID of the snack
     * @param snackDTO The DTO containing updated details
     * @return Updated SnackDTO
     * @throws SnackNotFoundException if the snack is not found
     */
    @Override
    @Transactional
    public SnackDTO updateSnack(@NotNull UUID id, @Valid SnackDTO snackDTO) {
        return snackRepository.findById(id)
                .map(snack -> {
                    snack.setName(snackDTO.getName());
                    snack.setDescription(snackDTO.getDescription());
                    snack.setImage(snackDTO.getImage());
                    snack.setPrice(snackDTO.getPrice());
                    snack.setIsDelete(snackDTO.getIsDelete());
                    snack.setIsAvailable(snackDTO.getIsAvailable());
                    snack.setBrandId(snackDTO.getBrandId());
                    return toDTO(snackRepository.save(snack));
                })
                .orElseThrow(() -> new SnackNotFoundException(id));
    }

    /**
     * Retrieves all available snacks (isDelete = false, isAvailable = true) with pagination.
     *
     * @param page  The page number (optional, defaults to 1)
     * @param limit The number of items per page (optional, defaults to 10)
     * @return PaginatedResponse containing SnackDTOs
     */
    @Override
    @Transactional(readOnly = true)
    public PaginatedResponse<SnackDTO> getAllAvailableSnacksByBrand(UUID brandId, Integer page, Integer limit) {
        int pageNumber = (page != null && page > 0) ? page - 1 : 0;
        int pageSize = (limit != null && limit > 0) ? limit : 10;
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
    
        Page<Snack> snackPage = snackRepository.findByIsDeleteFalseAndIsAvailableTrueAndBrandId(pageable, brandId);
        List<SnackDTO> snackDTOs = snackPage.getContent().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    
        return PaginatedResponse.<SnackDTO>builder()
                .data(snackDTOs)
                .page(pageNumber + 1)
                .limit(pageSize)
                .totalElements(snackPage.getTotalElements())
                .totalPages(snackPage.getTotalPages())
                .lastPage(snackPage.isLast())
                .build();
    }
    /**
     * Sets the isDelete status of a snack.
     *
     * @param id           The UUID of the snack
     * @param statusDTO    The DTO containing the isDelete status
     * @throws SnackNotFoundException if the snack is not found
     */
    @Override
    @Transactional
    public void setDeleteStatus(@NotNull UUID id, @Valid SnackStatusDTO statusDTO) {
        Snack snack = snackRepository.findById(id)
                .orElseThrow(() -> new SnackNotFoundException(id));
        snack.setIsDelete(statusDTO.getStatus());
        snackRepository.save(snack);
    }

    /**
     * Sets the isAvailable status of a snack.
     *
     * @param id           The UUID of the snack
     * @param statusDTO    The DTO containing the isAvailable status
     * @throws SnackNotFoundException if the snack is not found
     */
    @Override
    @Transactional
    public void setAvailabilityStatus(@NotNull UUID id, @Valid SnackStatusDTO statusDTO) {
        Snack snack = snackRepository.findById(id)
                .orElseThrow(() -> new SnackNotFoundException(id));
        snack.setIsAvailable(statusDTO.getStatus());
        snackRepository.save(snack);
    }

    private SnackDTO toDTO(Snack snack) {
        return SnackDTO.builder()
                .id(snack.getId())
                .name(snack.getName())
                .description(snack.getDescription())
                .image(snack.getImage())
                .price(snack.getPrice())
                .isDelete(snack.getIsDelete())
                .brandId(snack.getBrandId())
                .isAvailable(snack.getIsAvailable())
                .build();
    }

    private Snack toEntity(SnackDTO snackDTO) {
        return Snack.builder()
                .name(snackDTO.getName())
                .description(snackDTO.getDescription())
                .image(snackDTO.getImage())
                .price(snackDTO.getPrice())
                .isDelete(snackDTO.getIsDelete())
                .brandId(snackDTO.getBrandId())
                .isAvailable(snackDTO.getIsAvailable())
                .build();
    }
}