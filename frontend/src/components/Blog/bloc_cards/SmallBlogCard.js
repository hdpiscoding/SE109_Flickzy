import React from "react";
import "./SmallBlogCard.scss";

export default function SmallBlogCard({ blog }) {
  return (
    <div className="article-item">
      <img
        className="article-image"
        src={blog.cover}
        alt={blog.title || "blog cover"}
      />
      <div className="article-content">
        <div className="article-title">{blog ? blog.title : "N/A"}</div>
        <div className="article-view">
          {blog && blog.views ? blog.views : "N/A"} lượt xem
        </div>
        <div className="article-description">
          {blog && blog.description ? blog.description : "N/A"}
        </div>
      </div>
    </div>
  );
}
