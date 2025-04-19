package com.flickzy.service.implemetations;

import com.flickzy.dto.GenreDTO;
import com.flickzy.entity.Genres;
import com.flickzy.mapper.GenreMapper;
import com.flickzy.repository.GenreRepository;
import com.flickzy.service.interfaces.GenreService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class GenreServiceImpl implements GenreService {
    private final GenreRepository genreRepository;
    private final GenreMapper genreMapper;

    @Override
    public GenreDTO createGenre(GenreDTO genreDTO) {
        Genres genres = Genres
                .builder()
                .name(genreDTO.getName())
                .build();
        return genreMapper.toDto(genreRepository.save(genres));
    }

    @Override
    public GenreDTO updateGenre(UUID id, GenreDTO genreDTO) {
        Genres genre = genreRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Genre not found!"));
        if (genre.getName().equals("Others")){
            throw new IllegalArgumentException("You cannot update the Others genre!");
        } else {
            genre.setName(genreDTO.getName());
            return genreMapper.toDto(genreRepository.save(genre));
        }
    }

    @Override
    public void deleteGenre(UUID id) {
        Genres genre = genreRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Genre not found!"));
        if (genre.getName().equals("Others")){
            throw new IllegalArgumentException("You cannot delete the Others genre!");
        } else {
            genreRepository.delete(genre);
        }
    }

    @Override
    public List<GenreDTO> getAllGenres() {
        return genreMapper.toDtoList(genreRepository.findAll());
    }
}
