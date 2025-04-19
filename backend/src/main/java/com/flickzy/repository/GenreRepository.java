package com.flickzy.repository;

import com.flickzy.entity.Genres;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface GenreRepository extends JpaRepository<Genres, UUID> {
}
