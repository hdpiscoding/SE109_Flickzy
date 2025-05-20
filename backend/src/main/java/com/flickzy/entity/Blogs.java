package com.flickzy.entity;

import com.flickzy.base.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

@Entity
@Table(name = "blogs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Blogs extends BaseEntity {
    @Id
    @GeneratedValue
    @Column(columnDefinition = "uuid")
    UUID id;

    @Column(columnDefinition = "text")
    String content;

    @Column(columnDefinition = "text")
    String description;

    @ManyToOne
    @JoinColumn(name = "category_id")
    BlogCategories category;

    @ManyToOne
    @JoinColumn(name = "user_id")
    Users user;

    String title;

    @Column(columnDefinition = "text")
    String cover;

    Integer timeToRead;

    Integer views;
}