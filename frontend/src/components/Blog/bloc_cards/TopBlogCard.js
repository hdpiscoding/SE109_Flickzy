import React from "react";
import "./TopBlogCard.scss";

export default function TopBlogCard({ blog }) {
  return (
    <div className="most-viewed-item">
      <img
        className="most-viewed-image"
        src={blog && blog.cover ? blog.cover : ""}
        alt={blog && blog.title ? blog.title : "blog cover"}
      />
      <div className="most-viewed-title">
        {blog && blog.title ? blog.title : "N/A"}
      </div>
    </div>
  );
}
