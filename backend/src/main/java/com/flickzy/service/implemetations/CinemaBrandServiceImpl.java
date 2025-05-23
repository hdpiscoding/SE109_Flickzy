package com.flickzy.service.implemetations;

import com.flickzy.dto.CinemaBrandDTO;
import com.flickzy.dto.PaginatedResponse;
import com.flickzy.entity.CinemaBrand;
import com.flickzy.exception.CinemaBrandNotFoundException;
import com.flickzy.repository.CinemaBrandRepository;
import com.flickzy.service.interfaces.CinemaBrandService;
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
 * Implementation of CinemaBrandService for managing cinema brand entities.
 */
@Service
@RequiredArgsConstructor
public class CinemaBrandServiceImpl implements CinemaBrandService {

    private final CinemaBrandRepository cinemaBrandRepository;

    @Override
    @Transactional
    public CinemaBrandDTO createCinemaBrand(@Valid CinemaBrandDTO cinemaBrandDTO) {
        CinemaBrand cinemaBrand = toEntity(cinemaBrandDTO);
        CinemaBrand savedBrand = cinemaBrandRepository.save(cinemaBrand);
        return toDTO(savedBrand);
    }

    @Override
    @Transactional
    public CinemaBrandDTO updateCinemaBrand(@NotNull UUID id, @Valid CinemaBrandDTO cinemaBrandDTO) {
        return cinemaBrandRepository.findById(id)
                .map(existingBrand -> {
                    if (cinemaBrandDTO.getBrandName() != null) {
                        existingBrand.setBrandName(cinemaBrandDTO.getBrandName());
                    }
                    if (cinemaBrandDTO.getAvatar() != null) {
                        existingBrand.setAvatar(cinemaBrandDTO.getAvatar());
                    }
                    if (cinemaBrandDTO.getCover() != null) {
                        existingBrand.setCover(cinemaBrandDTO.getCover());
                    }
                    if (cinemaBrandDTO.getDescription() != null) {
                        existingBrand.setDescription(cinemaBrandDTO.getDescription());
                    }
                    return toDTO(cinemaBrandRepository.save(existingBrand));
                })
                .orElseThrow(() -> new CinemaBrandNotFoundException(id));
    }
    @Override
    @Transactional
    public void deleteCinemaBrand(@NotNull UUID id) {
        if (!cinemaBrandRepository.existsById(id)) {
            throw new CinemaBrandNotFoundException(id);
        }
        cinemaBrandRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public PaginatedResponse<CinemaBrandDTO> getAllCinemaBrands(Integer page, Integer limit) {
        int pageNumber = (page != null && page > 0) ? page - 1 : 0;
        int pageSize = (limit != null && limit > 0) ? limit : 10;
        Pageable pageable = PageRequest.of(pageNumber, pageSize);

        Page<CinemaBrand> brandPage = cinemaBrandRepository.findAll(pageable);
        List<CinemaBrandDTO> brandDTOs = brandPage.getContent().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());

        return PaginatedResponse.<CinemaBrandDTO>builder()
                .data(brandDTOs)
                .page(pageNumber + 1)
                .limit(pageSize)
                .totalElements(brandPage.getTotalElements())
                .totalPages(brandPage.getTotalPages())
                .lastPage(brandPage.isLast())
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public CinemaBrandDTO getCinemaBrandById(@NotNull UUID id) {
        return cinemaBrandRepository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new CinemaBrandNotFoundException(id));
    }

    private CinemaBrandDTO toDTO(CinemaBrand cinemaBrand) {
        return CinemaBrandDTO.builder()
                .id(cinemaBrand.getId())
                .brandName(cinemaBrand.getBrandName())
                .avatar(cinemaBrand.getAvatar())
                .cover(cinemaBrand.getCover())
                .description(cinemaBrand.getDescription())
                .build();
    }

    private CinemaBrand toEntity(CinemaBrandDTO cinemaBrandDTO) {
        return CinemaBrand.builder()
                .brandName(cinemaBrandDTO.getBrandName())
                .avatar(cinemaBrandDTO.getAvatar())
                .cover(cinemaBrandDTO.getCover())
                .description(cinemaBrandDTO.getDescription())
                .build();
    }
}