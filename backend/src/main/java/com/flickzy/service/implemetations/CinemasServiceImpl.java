package com.flickzy.service.implemetations;

import com.flickzy.dto.CinemaDTO;
import com.flickzy.dto.PaginatedResponse;
import com.flickzy.entity.CinemaBrand;
import com.flickzy.entity.Cinemas;
import com.flickzy.mapper.CinemasMapper;
import com.flickzy.repository.CinemaBrandRepository;
import com.flickzy.repository.CinemasRepository;
import com.flickzy.service.interfaces.CinemasService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CinemasServiceImpl implements CinemasService {
    private static final Logger logger = LoggerFactory.getLogger(CinemasServiceImpl.class);

    private final CinemasRepository cinemasRepository;
    private final CinemaBrandRepository CinemaBrandRepository;
    private final CinemasMapper cinemasMapper;

    @Override
    public CinemaDTO createCinema(CinemaDTO cinemaDTO) {
        logger.info("Creating new cinema: {}", cinemaDTO.getCinemaName());

        CinemaBrand cinemaBrand = CinemaBrandRepository.findById(cinemaDTO.getBrandId())
                .orElseThrow(() -> {
                    logger.error("CinemaBrand not found with id: {}", cinemaDTO.getBrandId());
                    return new EntityNotFoundException("CinemaBrand not found");
                });

        Cinemas cinema = cinemasMapper.toEntity(cinemaDTO);
        cinema.setCinemaBrand(cinemaBrand);

        Cinemas savedCinema = cinemasRepository.save(cinema);
        logger.info("Cinema created successfully with id: {}", savedCinema.getId());

        return cinemasMapper.toDto(savedCinema);
    }

    @Override
    public CinemaDTO updateCinema(UUID id, CinemaDTO cinemaDTO) {
        logger.info("Updating cinema with id: {}", id);

        Cinemas existingCinema = cinemasRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("Cinema not found with id: {}", id);
                    return new EntityNotFoundException("Cinema not found");
                });

        CinemaBrand cinemaBrand = CinemaBrandRepository.findById(cinemaDTO.getBrandId())
                .orElseThrow(() -> {
                    logger.error("CinemaBrand not found with id: {}", cinemaDTO.getBrandId());
                    return new EntityNotFoundException("CinemaBrand not found");
                });

        if (cinemaDTO.getCinemaName() != null) {
            existingCinema.setCinemaName(cinemaDTO.getCinemaName());
        }
        if (cinemaDTO.getCinemaAddress() != null) {
            existingCinema.setCinemaAddress(cinemaDTO.getCinemaAddress());
        }
        if (cinemaDTO.getProvince() != null) {
            existingCinema.setProvince(cinemaDTO.getProvince());
        }
        existingCinema.setCinemaBrand(cinemaBrand);

        Cinemas updatedCinema = cinemasRepository.save(existingCinema);
        logger.info("Cinema updated successfully with id: {}", id);

        return cinemasMapper.toDto(updatedCinema);
    }

    @Override
    public void deleteCinema(UUID id) {
        logger.info("Deleting cinema with id: {}", id);

        if (!cinemasRepository.existsById(id)) {
            logger.error("Cinema not found with id: {}", id);
            throw new EntityNotFoundException("Cinema not found");
        }

        cinemasRepository.deleteById(id);
        logger.info("Cinema deleted successfully with id: {}", id);
    }

    @Override
    public PaginatedResponse<CinemaDTO> getAllCinemas(Integer page, Integer limit) {
        logger.info("Fetching all cinemas with page: {}, limit: {}", page, limit);

        int pageNum = page == null ? 1 : page;
        int pageSize = limit == null ? 10 : limit;
        PageRequest pageRequest = PageRequest.of(pageNum - 1, pageSize);

        Page<Cinemas> cinemaPage = cinemasRepository.findAll(pageRequest);
        return new PaginatedResponse<>(
                cinemasMapper.toDtoList(cinemaPage.getContent()),
                cinemaPage.getNumber() + 1,
                cinemaPage.getSize(),
                cinemaPage.getTotalElements(),
                cinemaPage.getTotalPages(),
                cinemaPage.isLast()
        );
    }

    @Override
    public CinemaDTO getCinemaById(UUID id) {
        logger.info("Fetching cinema with id: {}", id);

        Cinemas cinema = cinemasRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("Cinema not found with id: {}", id);
                    return new EntityNotFoundException("Cinema not found");
                });

        return cinemasMapper.toDto(cinema);
    }
}