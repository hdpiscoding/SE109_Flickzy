package com.flickzy.repository;

import com.flickzy.entity.BlogCategories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface BlogCategoriesRepository extends JpaRepository<BlogCategories, UUID> {
}