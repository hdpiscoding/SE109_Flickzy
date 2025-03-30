package com.flickzy.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

@Entity
@Table(name = "booking")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Booking {
    @Id
    @GeneratedValue
    @Column(columnDefinition = "uuid")
    UUID bookingId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    Users user;

    @ManyToOne
    @JoinColumn(name = "schedule_id")
    Schedule schedule;

    @ManyToOne
    @JoinColumn(name = "seat_id")
    Seats seat;

    Double price;

    Integer seatStatus;
}