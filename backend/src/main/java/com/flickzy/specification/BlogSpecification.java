package com.flickzy.specification;

import com.flickzy.entity.BlogCategories;
import com.flickzy.entity.Blogs;
import jakarta.persistence.criteria.Join;
import org.springframework.data.jpa.domain.Specification;

import java.util.UUID;

public class BlogSpecification {
    public static Specification<Blogs> hasCategory(UUID categoryId) {
        return (root, query, cb) -> {
            if (categoryId == null) return null;
            Join<Blogs, BlogCategories> categoryJoin = root.join("category");
            return cb.equal(categoryJoin.get("id"), categoryId);
        };
    }

    public static Specification<Blogs> orderByViewsDesc() {
        return (root, query, cb) -> {
            query.orderBy(cb.desc(root.get("views")));
            return null;
        };
    }
}