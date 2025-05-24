package com.flickzy.repository;

 import com.flickzy.entity.ScheduleType;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ScheduleTypeRepository extends JpaRepository<ScheduleType, UUID>, JpaSpecificationExecutor<ScheduleType > {
}