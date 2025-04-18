package com.flickzy.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Set;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MovieDTO {
    private UUID id;
    private String movieName;
    private String movieDescription;
    private String movieContent;
    private String movieTrailer;
    private String genres;
    private LocalDate movieRelease;
    private String moviePoster;
    private String movieNation;
    private Integer movieLength;
    private String movieActors;
    private String movieDirector;
    private String ageRating;
    private Set<ReviewDTO> reviews;
}
