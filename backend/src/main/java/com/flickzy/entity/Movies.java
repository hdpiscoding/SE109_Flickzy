package com.flickzy.entity;

import com.flickzy.base.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "movies")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Movies extends BaseEntity {
    @Id
    @GeneratedValue
    @Column(name="id", columnDefinition = "uuid")
    UUID id;

    @Column(name = "movie_name", nullable = false)
    String movieName;

    @Column(columnDefinition = "text", name = "movie_description")
    String movieDescription;

    @Column(columnDefinition = "text", name = "movie_content")
    String movieContent;

    @Column(columnDefinition = "text", name = "movie_trailer")
    String movieTrailer;

    @ManyToMany
    @JoinTable(
            name = "movie_genre",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "genre_id"))
    List<Genres> genres;

    @Column(name = "movie_release")
    LocalDate movieRelease;

    @Column(name = "movie_length")
    Integer movieLength;

    @Column(name = "movie_nation")
    String movieNation;

    @Column(columnDefinition = "text", name = "movie_poster")
    String moviePoster;

    @Column(name = "movie_director")
    String movieDirector;

    @Column(columnDefinition = "text", name = "movie_actors")
    String movieActors;

    @Column(name = "age_rating")
    String ageRating;

    @OneToMany(mappedBy = "movie", fetch =FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    List<Schedule> schedules;

    @OneToMany(mappedBy = "movie", fetch =FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    List<Reviews> reviews;
}