package com.flickzy.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

@Entity
@Table(name = "blogs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Blogs {
    @Id
    @GeneratedValue
    Long id;

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