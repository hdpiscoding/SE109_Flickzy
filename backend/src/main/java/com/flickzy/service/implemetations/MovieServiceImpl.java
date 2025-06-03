package com.flickzy.service.implemetations;

import com.flickzy.dto.GenreDTO;
import com.flickzy.dto.MovieDTO;
import com.flickzy.dto.PaginatedResponse;
import com.flickzy.dto.filters.MovieFilter;
import com.flickzy.entity.Genres;
import com.flickzy.entity.Movies;
import com.flickzy.mapper.MovieMapper;
import com.flickzy.repository.GenreRepository;
import com.flickzy.repository.MovieRepository;
import com.flickzy.repository.ReviewRepository;
import com.flickzy.service.interfaces.MovieService;
import com.flickzy.utils.dates.DateUtils;
import com.flickzy.specification.MovieSpecification;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class MovieServiceImpl implements MovieService {
    private final MovieRepository movieRepository;
    private final GenreRepository genreRepository;
    private final ReviewRepository reviewRepository;
    private final MovieMapper movieMapper;

    @Override
    @Transactional
    public MovieDTO createMovie(MovieDTO movieDTO) {
        List<Genres> genres = genreRepository.findAllById(movieDTO.getGenres().stream().map(GenreDTO::getId).toList());
        Movies movie = Movies
                .builder()
                .movieName(movieDTO.getMovieName())
                .movieDescription(movieDTO.getMovieDescription())
                .movieContent(movieDTO.getMovieContent())
                .movieTrailer(movieDTO.getMovieTrailer())
                .genres(genres)
                .movieRelease(DateUtils.parseToLocalDate(movieDTO.getMovieRelease().toString()))
                .moviePoster(movieDTO.getMoviePoster())
                .movieBackground(movieDTO.getMovieBackground())
                .movieNation(movieDTO.getMovieNation())
                .movieLength(movieDTO.getMovieLength())
                .movieActors(movieDTO.getMovieActors())
                .movieDirector(movieDTO.getMovieDirector())
                .ageRating(movieDTO.getAgeRating())
                .build();
        MovieDTO new_movie = movieMapper.toDto(movieRepository.save(movie));
        return new_movie;
    }

    @Override
    @Transactional
    public MovieDTO updateMovie(UUID id, MovieDTO movieDTO) {
        Movies movie = movieRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Movie not found!"));
        if (movieDTO.getMovieName() != null) {
            movie.setMovieName(movieDTO.getMovieName());
        }
        if (movieDTO.getMovieDescription() != null) {
            movie.setMovieDescription(movieDTO.getMovieDescription());
        }
        if (movieDTO.getMovieContent() != null) {
            movie.setMovieContent(movieDTO.getMovieContent());
        }
        if (movieDTO.getMovieTrailer() != null) {
            movie.setMovieTrailer(movieDTO.getMovieTrailer());
        }
        if (movieDTO.getGenres() != null) {
            List<Genres> genres = genreRepository.findAllById(movieDTO.getGenres().stream().map(GenreDTO::getId).toList());
            movie.setGenres(genres);
        }
        if (movieDTO.getMovieRelease() != null) {
            movie.setMovieRelease(DateUtils.parseToLocalDate(movieDTO.getMovieRelease().toString()));
        }
        if (movieDTO.getMoviePoster() != null) {
            movie.setMoviePoster(movieDTO.getMoviePoster());
        }
        if (movieDTO.getMovieBackground() != null) {
            movie.setMovieBackground(movieDTO.getMovieBackground());
        }
        if (movieDTO.getMovieNation() != null) {
            movie.setMovieNation(movieDTO.getMovieNation());
        }
        if (movieDTO.getMovieLength() != null) {
            movie.setMovieLength(movieDTO.getMovieLength());
        }
        if (movieDTO.getMovieActors() != null) {
            movie.setMovieActors(movieDTO.getMovieActors());
        }
        if (movieDTO.getMovieDirector() != null) {
            movie.setMovieDirector(movieDTO.getMovieDirector());
        }
        if (movieDTO.getAgeRating() != null) {
            movie.setAgeRating(movieDTO.getAgeRating());
        }

        Movies m = movieRepository.save(movie);
        m.setReviews(null);

        return movieMapper.toDto(m);
    }

    @Override
    @Transactional
    public void deleteMovie(UUID id) {
        movieRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public PaginatedResponse<MovieDTO> getAllMovies(MovieFilter filters) {
        int page = filters.getPage() == null ? 1 : filters.getPage();
        int limit = filters.getLimit() == null ? 10 : filters.getLimit();
        String genre = filters.getGenres() == null ? null : filters.getGenres().toString();
        Specification<Movies> spec = Specification.where(null);

        if (genre != null && !genre.isEmpty()){
            spec = spec.and(MovieSpecification.hasGenre(UUID.fromString(genre)));
        }

        if (filters.getYearRelease() != null) {
            spec = spec.and(MovieSpecification.hasYear(filters.getYearRelease()));
        }

        if (filters.getName() != null && !filters.getName().isEmpty()) {
            spec = spec.and(MovieSpecification.hasName(filters.getName()));
        }

        if (filters.getIsShowing() != null) {
            spec = spec.and(MovieSpecification.isCurrentlyShowing(filters.getIsShowing()));
        }

        PageRequest pageRequest = PageRequest.of(page - 1, limit);
        Page<Movies> movies = movieRepository.findAll(spec, pageRequest);
        List<MovieDTO> movieDTOs = movieMapper.toDtoList(movies.getContent()
                .stream()
                .peek(movie -> {
                    movie.setMovieDescription(null);
                    movie.setMovieNation(null);
                    movie.setMovieActors(null);
                    movie.setMovieDirector(null);
                    movie.setReviews(null);
                })
                .toList())
                .stream()
                .peek(movieDTO -> {
                    movieDTO.setMovieRating(reviewRepository.findAverageRatingByMovie_Id(movieDTO.getId()));
                })
                .toList();
        return new PaginatedResponse<>(
                movieDTOs,
                movies.getNumber() + 1,
                movies.getSize(),
                movies.getTotalElements(),
                movies.getTotalPages(),
                movies.isLast()
        );
    }

    @Override
    @Transactional(readOnly = true)
    public MovieDTO getMovieDetail(UUID id) {
        Movies movie = movieRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Movie not found!"));
        MovieDTO movieDTO = movieMapper.toDto(movie);
        movieDTO.setMovieRating(reviewRepository.findAverageRatingByMovie_Id(movieDTO.getId()));
        return movieDTO;
    }
}
