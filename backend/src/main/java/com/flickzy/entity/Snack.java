package com.flickzy.entity;

import com.flickzy.base.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

/**
 * Entity representing a snack available in the cinema.
 * Extends BaseEntity for common fields like createdAt, updatedAt.
 */
@Entity
@Table(name = "snacks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Snack extends BaseEntity {

    @Id
    @GeneratedValue
    @Column(columnDefinition = "uuid", updatable = false, nullable = false)
    UUID id;


    String name;

    @Column
    String description;

    @Column
    String image;
    @Column(name = "brand_id")
    UUID brandId;
    

   
    Integer price;


    @Builder.Default
    Boolean isDelete = false;


    @Builder.Default
    Boolean isAvailable = true;
}