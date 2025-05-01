package com.flickzy.service.interfaces;

import com.flickzy.dto.GenreDTO;

import java.util.List;
import java.util.UUID;

public interface GenreService {
    GenreDTO createGenre(GenreDTO genreDTO);
    GenreDTO updateGenre(UUID id, GenreDTO genreDTO);
    void deleteGenre(UUID id);
    List<GenreDTO> getAllGenres();
}
