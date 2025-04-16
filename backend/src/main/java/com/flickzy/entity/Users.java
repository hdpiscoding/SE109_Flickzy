package com.flickzy.entity;
import com.flickzy.base.BaseEntity;
import com.flickzy.utils.enums.Role;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Users extends BaseEntity implements UserDetails {
    @Id
    @GeneratedValue
    @Column(columnDefinition = "uuid")
    UUID id;

    String password;

    @Enumerated(EnumType.STRING)
    Role role;

    String fullname;

    LocalDate birthday;

    Boolean gender;

    @Column(columnDefinition = "text", unique = true)
    String email;

    @Column(columnDefinition = "text")
    String phone;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    List<Booking> bookings;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    List<Reviews> reviews;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    List<Blogs> blogs;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }
}