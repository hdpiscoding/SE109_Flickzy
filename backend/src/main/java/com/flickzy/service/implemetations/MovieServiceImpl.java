package com.flickzy.service.implemetations;

import com.flickzy.dto.MovieDTO;
import com.flickzy.dto.PaginatedResponse;
import com.flickzy.dto.filters.MovieFilter;
import com.flickzy.entity.Genres;
import com.flickzy.entity.Movies;
import com.flickzy.mapper.MovieMapper;
import com.flickzy.repository.GenreRepository;
import com.flickzy.repository.MovieRepository;
import com.flickzy.service.interfaces.MovieService;
import com.flickzy.utils.specifications.MovieSpecification;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class MovieServiceImpl implements MovieService {
    private final MovieRepository movieRepository;
    private final GenreRepository genreRepository;
    private final MovieMapper movieMapper;

    @Override
    public MovieDTO createMovie(MovieDTO movieDTO) {
        List<Genres> genres = genreRepository.findAllById(movieDTO.getGenres().stream().map(Genres::getId).toList());
        Movies movie = Movies
                .builder()
                .movieName(movieDTO.getMovieName())
                .movieDescription(movieDTO.getMovieDescription())
                .movieContent(movieDTO.getMovieContent())
                .movieTrailer(movieDTO.getMovieTrailer())
                .genres(genres)
                .movieRelease(movieDTO.getMovieRelease())
                .moviePoster(movieDTO.getMoviePoster())
                .movieNation(movieDTO.getMovieNation())
                .movieLength(movieDTO.getMovieLength())
                .movieActors(movieDTO.getMovieActors())
                .movieDirector(movieDTO.getMovieDirector())
                .ageRating(movieDTO.getAgeRating())
                .build();
        return movieMapper.toDto(movieRepository.save(movie));
    }

    @Override
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
            List<Genres> genres = genreRepository.findAllById(movieDTO.getGenres().stream().map(Genres::getId).toList());
            movie.setGenres(genres);
        }
        if (movieDTO.getMovieRelease() != null) {
            movie.setMovieRelease(movieDTO.getMovieRelease());
        }
        if (movieDTO.getMoviePoster() != null) {
            movie.setMoviePoster(movieDTO.getMoviePoster());
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
        return movieMapper.toDto(movieRepository.save(movie));
    }

    @Override
    public void deleteMovie(UUID id) {
        movieRepository.deleteById(id);
    }

    @Override
    public PaginatedResponse<MovieDTO> getAllMovies(MovieFilter filters) {
        int page = filters.getPage() == null ? 1 : filters.getPage();
        int limit = filters.getLimit() == null ? 10 : filters.getLimit();
        Specification<Movies> spec = Specification
                .where(MovieSpecification.hasGenre(filters.getGenres().toString()))
                .and(MovieSpecification.hasYear(filters.getYear_release()))
                .and(MovieSpecification.hasName(filters.getName()))
                .and(MovieSpecification.isCurrentlyShowing(filters.isShowing()));
        PageRequest pageRequest = PageRequest.of(page - 1, limit);
        Page<Movies> movies = movieRepository.findAll(spec, pageRequest);
        return new PaginatedResponse<>(
                movieMapper.toDtoList(movies.getContent()),
                movies.getNumber() + 1,
                movies.getSize(),
                movies.getTotalElements(),
                movies.getTotalPages(),
                movies.isLast()
        );
    }

    @Override
    public MovieDTO getMovieDetail(UUID id) {
        Movies movie = movieRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Movie not found!"));
        return movieMapper.toDto(movie);
    }
}
