package com.flickzy.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "blogCategories")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BlogCategories {
    @Id
    @GeneratedValue
    @Column(columnDefinition = "uuid")
    UUID id;

    String category;

    @OneToMany(mappedBy = "category")
    List<Blogs> blogs;
}