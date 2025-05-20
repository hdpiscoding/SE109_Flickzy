package com.flickzy.repository;

import com.flickzy.entity.Blogs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface BlogRepository extends JpaRepository<Blogs, UUID>, JpaSpecificationExecutor<Blogs> {
}