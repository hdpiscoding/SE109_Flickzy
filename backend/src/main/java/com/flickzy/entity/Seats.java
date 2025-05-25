package com.flickzy.entity;

import com.flickzy.base.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "seats")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Seats extends BaseEntity {
    @Id
    @GeneratedValue
    @Column(columnDefinition = "uuid")
    UUID seatId;

    @ManyToOne
    @JoinColumn(name = "seat_type_id", referencedColumnName = "seatTypeId")
    SeatType seatTypeId;


    @ManyToOne
    @JoinColumn(name = "room_id" , referencedColumnName = "roomId")
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