package com.flickzy.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "room")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Room {
    @Id
    @GeneratedValue
    @Column(columnDefinition = "uuid")
    UUID roomId;

    @ManyToOne
    @JoinColumn(name = "cinema_id")
    Cinemas cinema;

    @Column(columnDefinition = "text")
    String roomName;

    String roomType;
    int width;
    int height;

    @OneToMany(mappedBy = "room")
    @JsonIgnore
    List<Seats> seats;

    @OneToMany(mappedBy = "room")

    List<Schedule> schedules;
    Room(String id) {
        this.roomId = UUID.fromString(id);
    }
}