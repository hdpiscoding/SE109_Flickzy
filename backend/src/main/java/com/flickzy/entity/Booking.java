package com.flickzy.entity;

import com.flickzy.base.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

@Entity
@Table(name = "booking")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Booking extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "uuid", updatable = false, nullable = false)
    UUID bookingId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    Users user;

    @ManyToOne
    @JoinColumn(name = "schedule_id")
    Schedule schedule;

    @Column(columnDefinition = "text")
    String seats; // JSON array as text

    @Column(columnDefinition = "text")
    String snacks; // JSON array as text

    // Add momoID field
    @Column(name = "momo_id")
    String momoID;

 @Column(name = "email")
    String email;
    Double price;

    Integer seatStatus;
}