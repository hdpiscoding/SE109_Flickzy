package com.flickzy.entity;

import com.flickzy.base.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

@Entity
@Table(name = "seat_types")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SeatType extends BaseEntity {
    @Id
    @GeneratedValue
    @Column(columnDefinition = "uuid")
    UUID seatTypeId;
    @Column(nullable = true)
    String name;


    @Column(nullable = false)
    Integer width;

    @Column(nullable = false)
    Integer height;
     @Column
    Integer price;
     @Column
    String description;

    @Column(nullable = false, length = 20)
    String color;
       // Constructor nhận UUID từ chuỗi
    public SeatType(String id) {
        this.seatTypeId = UUID.fromString(id);
    }
}
