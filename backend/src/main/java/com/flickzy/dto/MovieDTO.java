package com.flickzy.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.flickzy.entity.Genres;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MovieDTO {
    private UUID id;

    private String movieName;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String movieDescription;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String movieContent;

    private String movieTrailer;

    private List<GenreDTO> genres;

    private LocalDate movieRelease;

    private String moviePoster;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String movieNation;

    private Integer movieLength;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String movieActors;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String movieDirector;

    private String ageRating;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Set<ReviewDTO> reviews;
}
