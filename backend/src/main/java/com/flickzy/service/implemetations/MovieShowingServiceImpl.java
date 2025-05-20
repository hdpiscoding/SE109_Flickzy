package com.flickzy.service.implemetations;

import com.flickzy.dto.MovieShowingDTO;
import com.flickzy.entity.MovieShowing;
import com.flickzy.entity.Movies;
import com.flickzy.mapper.MovieShowingMapper;
import com.flickzy.repository.MovieRepository;
import com.flickzy.repository.MovieShowingRepository;
import com.flickzy.service.interfaces.MovieShowingService;
import com.flickzy.utils.dates.DateUtils;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class MovieShowingServiceImpl implements MovieShowingService {
    private final MovieShowingRepository movieShowingRepository;
    private final MovieShowingMapper movieShowingMapper;
    private final MovieRepository movieRepository;

    @Override
    @Transactional
    public MovieShowingDTO createMovieShowing(UUID movieId, MovieShowingDTO movieShowingDTO) {
        Movies movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new EntityNotFoundException("Movie not found!"));
        if (movie.getMovieRelease().isAfter(movieShowingDTO.getStartDate())) {
            throw new IllegalArgumentException("Movie release date cannot be after movie showing start date!");
        }

        if (movieShowingDTO.getStartDate().isAfter(movieShowingDTO.getEndDate())) {
            throw new IllegalArgumentException("Start date cannot be after end date!");
        }

        MovieShowing movieShowing = MovieShowing.builder()
                .id(movieShowingDTO.getId())
                .movie(movie)
                .name(movieShowingDTO.getName())
                .startDate(DateUtils.parseToLocalDate(movieShowingDTO.getStartDate().toString()))
                .endDate(DateUtils.parseToLocalDate(movieShowingDTO.getEndDate().toString()))
                .build();
        return movieShowingMapper.toDto(movieShowingRepository.save(movieShowing));
    }

    @Override
    @Transactional
    public MovieShowingDTO updateMovieShowing(UUID id, MovieShowingDTO movieShowingDTO) {
        MovieShowing movieShowing = movieShowingRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Movie showing not found!"));
        Movies movie = movieRepository.findById(movieShowing.getMovie().getId())
                .orElseThrow(() -> new EntityNotFoundException("Movie not found!"));

        if (movie.getMovieRelease().isAfter(movieShowingDTO.getStartDate())) {
            throw new IllegalArgumentException("Movie release date cannot be after movie showing start date!");
        }

        if (movieShowingDTO.getStartDate().isAfter(movieShowingDTO.getEndDate())) {
            throw new IllegalArgumentException("Start date cannot be after end date!");
        }

        if (movieShowingDTO.getName() != null) {
            movieShowing.setName(movieShowingDTO.getName());
        }
        if (movieShowingDTO.getStartDate() != null) {
            movieShowing.setStartDate(DateUtils.parseToLocalDate(movieShowingDTO.getStartDate().toString()));
        }
        if (movieShowingDTO.getEndDate() != null) {
            movieShowing.setEndDate(DateUtils.parseToLocalDate(movieShowingDTO.getEndDate().toString()));
        }
        return movieShowingMapper.toDto(movieShowingRepository.save(movieShowing));
    }

    @Override
    @Transactional
    public void deleteMovieShowing(UUID id) {
        movieShowingRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<MovieShowingDTO> getAllMovieShowingsByMovie(UUID movieId) {
        List<MovieShowing> movieShowing = movieShowingRepository.findByMovieId(movieId);

        return movieShowingMapper.toDtoList(movieShowing
                .stream()
                .peek(movieShowingDTO -> {
                    movieShowingDTO.setMovie(null);
                })
                .toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<MovieShowingDTO> getAllMovieShowings() {
        return movieShowingMapper.toDtoList(movieShowingRepository.findAll());
    }
}
