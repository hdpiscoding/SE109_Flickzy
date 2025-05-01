package com.flickzy.entity;
import com.flickzy.base.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "cinemas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Cinemas extends BaseEntity {
    @Id
    @GeneratedValue
    @Column(columnDefinition = "uuid")
    UUID id;

    String cinemaName;

    @ManyToOne
    @JoinColumn(name = "brand_id")
    CinemaBrand cinemaBrand;

    String cinemaAddress;

    String province;

    @OneToMany(mappedBy = "cinema")
    List<Room> rooms;
}