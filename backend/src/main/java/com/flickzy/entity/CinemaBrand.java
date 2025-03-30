package com.flickzy.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "cinemaBrand")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CinemaBrand {
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
    List<Cinemas> cinemas;
}