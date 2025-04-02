package com.flickzy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.flickzy.entity.CinemaBrand;

import java.util.UUID;
@Repository
public interface cinemaBrandRepository extends JpaRepository<CinemaBrand, UUID>{


    
}