package com.flickzy.entity;

import com.flickzy.base.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.UUID;

/**
 * Entity representing a room in a cinema (e.g., screening room).
 * Extends BaseEntity for common fields like createdAt, updatedAt.
 */
@Entity
@Table(name = "room")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Room extends BaseEntity {

    @Id
    @GeneratedValue
    @Column(columnDefinition = "uuid", updatable = false, nullable = false)
    UUID roomId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cinema_id", nullable = true)
    Cinemas cinema;

    @Column(nullable = false)
    String roomName;

    @Column(nullable = false)
    String roomType;

    @Column(nullable = false)
    int width;

    @Column(nullable = false)
    int height;
    @Column(name="is_delete")
    boolean isDelete;

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    List<Seats> seats;

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    List<Schedule> schedules;
}