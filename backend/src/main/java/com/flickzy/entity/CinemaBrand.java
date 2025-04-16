package com.flickzy.entity;

import com.flickzy.base.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "cinemaBrand")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CinemaBrand extends BaseEntity {
    @Id
    @GeneratedValue
    @Column(columnDefinition = "uuid")
    UUID id;

    String brandName;

    @Column(columnDefinition = "text")
    String avatar;

    @Column(columnDefinition = "text")
    String cover;

    @Column(columnDefinition = "text")
    String description;

    @OneToMany(mappedBy = "cinemaBrand")
    @JsonIgnore 
    List<Cinemas> cinemas;
}