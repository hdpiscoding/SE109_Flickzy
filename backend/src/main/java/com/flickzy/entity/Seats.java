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

    @ManyToOne
    @JoinColumn(name = "seat_type_id", referencedColumnName = "seatTypeId", nullable = false)
    SeatType seatTypeId;


    @ManyToOne
    @JoinColumn(name = "room_id" , referencedColumnName = "roomId", nullable = false)
    Room room;

    @Column
    Integer row;
    @Column
    Integer columnn;
    @Column
    Integer price;

    String name;

    @OneToMany(mappedBy = "seat")
    List<Booking> bookings;
    
}