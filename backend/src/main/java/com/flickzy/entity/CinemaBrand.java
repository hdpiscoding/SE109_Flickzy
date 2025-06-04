package com.flickzy.entity;

import com.flickzy.base.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.UUID;

/**
 * Entity representing a cinema brand (e.g., CGV, Lotte Cinema).
 * Extends BaseEntity for common fields like createdAt, updatedAt.
 */
@Entity
@Table(name = "cinema_brand")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CinemaBrand extends BaseEntity {

    @Id
    @GeneratedValue
    @Column(columnDefinition = "uuid", updatable = false, nullable = false)
    UUID id;

    @Column(nullable = false)
    String brandName;

    @Column(columnDefinition = "text")
    String avatar;

    @Column(columnDefinition = "text")
    String cover;

    @Column(columnDefinition = "text")
    String description;
    @Column(columnDefinition = "text")
    String intro;

    @OneToMany(mappedBy = "cinemaBrand", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    List<Cinemas> cinemas;
}