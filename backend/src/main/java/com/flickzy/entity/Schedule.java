package com.flickzy.entity;

import com.flickzy.base.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "schedule")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Schedule extends BaseEntity {
    @Id
    @GeneratedValue
    @Column(columnDefinition = "uuid")
    UUID scheduleId;

    @ManyToOne
    @JoinColumn(name = "movie_id")
    Movies movie;

    @ManyToOne
    @JoinColumn(name = "room_id")
    Room room;

    LocalDate scheduleDate;

    LocalTime scheduleStart;

    LocalTime scheduleEnd;

    @OneToMany(mappedBy = "schedule")
    List<Booking> bookings;
}