package com.flickzy.entity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Users {
    @Id
    @GeneratedValue
    @Column(columnDefinition = "uuid")
    UUID id;

    String password;

    String fullname;

    LocalDate birthday;

    Boolean gender;

    @Column(columnDefinition = "text")
    String email;

    @Column(columnDefinition = "text")
    String phone;

    @OneToMany(mappedBy = "user")
    List<Booking> bookings;

    @OneToMany(mappedBy = "user")
    List<Reviews> reviews;

    @OneToMany(mappedBy = "user")
    List<Blogs> blogs;
}