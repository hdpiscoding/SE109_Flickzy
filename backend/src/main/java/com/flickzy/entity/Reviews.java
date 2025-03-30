package com.flickzy.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

@Entity
@Table(name = "reviews")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Reviews {
    @Id
    @GeneratedValue
    Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    Users user;

    @ManyToOne
    @JoinColumn(name = "movie_id")
    Movies movie;

    Integer star;

    @Column(columnDefinition = "text")
    String content;
}