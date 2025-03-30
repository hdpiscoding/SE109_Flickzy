package com.flickzy.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "seats")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Seats {
    @Id
    @GeneratedValue
    @Column(columnDefinition = "uuid")
    UUID seatId;

    Integer seatType;

    @ManyToOne
    @JoinColumn(name = "room_id")
    Room room;

    @Column(columnDefinition = "text")
    String row;

    Integer number;

    @OneToMany(mappedBy = "seat")
    List<Booking> bookings;
}