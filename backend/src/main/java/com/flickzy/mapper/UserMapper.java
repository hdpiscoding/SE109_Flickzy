package com.flickzy.mapper;

import com.flickzy.base.BaseMapper;
import com.flickzy.dto.User.UserResponse;
import com.flickzy.entity.Users;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class UserMapper implements BaseMapper<Users, UserResponse> {
    private final ModelMapper modelMapper;

    @Override
    public UserResponse toDto(Users entity) {
        return modelMapper.map(entity, UserResponse.class);
    }

    @Override
    public Users toEntity(UserResponse dto) {
        return modelMapper.map(dto, Users.class);
    }

    @Override
    public List<UserResponse> toDtoList(List<Users> entities) {
        return entities.stream().map(this::toDto).toList();
    }

    @Override
    public List<Users> toEntityList(List<UserResponse> dtos) {
        return dtos.stream().map(this::toEntity).toList();
    }

    @Override
    public Set<UserResponse> toDtoSet(Set<Users> entities) {
        return entities.stream().map(this::toDto).collect(Collectors.toSet());
    }

    @Override
    public Set<Users> toEntitySet(Set<UserResponse> dtos) {
        return dtos.stream().map(this::toEntity).collect(Collectors.toSet());
    }
}
