package com.flickzy.service.implemetations;

import com.flickzy.dto.MovieDTO;
import com.flickzy.entity.Movies;
import com.flickzy.mapper.MovieMapper;
import com.flickzy.repository.MovieRepository;
import com.flickzy.service.interfaces.MovieService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class MovieServiceImpl implements MovieService {
    private final MovieRepository movieRepository;
    private final MovieMapper movieMapper;

    @Override
    public MovieDTO createMovie(MovieDTO movieDTO) {
        Movies movie = Movies
                .builder()
                .movieName(movieDTO.getMovieName())
                .movieDescription(movieDTO.getMovieDescription())
                .movieContent(movieDTO.getMovieContent())
                .movieTrailer(movieDTO.getMovieTrailer())
                .genres(movieDTO.getGenres())
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
            movie.setGenres(movieDTO.getGenres());
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
    public List<MovieDTO> getAllMovies(Map<String, Object> filters) {
        return List.of();
    }

    @Override
    public MovieDTO getMovieDetail(UUID id) {
        Movies movie = movieRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Movie not found!"));
        return movieMapper.toDto(movie);
    }
}
