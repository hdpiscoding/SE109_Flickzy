package com.flickzy.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "movies")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Movies {
    @Id
    @GeneratedValue
    @Column(columnDefinition = "uuid")
    UUID id;

    String movieName;

    @Column(columnDefinition = "text")
    String movieDescription;

    @Column(columnDefinition = "text")
    String movieContent;

    @Column(columnDefinition = "text")
    String movieTrailer;

    @Column(columnDefinition = "json")
    String genres;

    LocalDate movieRelease;

    Integer movieLength;

    String movieNation;

    @Column(columnDefinition = "text")
    String moviePoster;

    String movieDirector;

    @Column(columnDefinition = "text")
    String movieActors;

    String ageRating;

    @OneToMany(mappedBy = "movie")
    List<Schedule> schedules;

    @OneToMany(mappedBy = "movie")
    List<Reviews> reviews;
}