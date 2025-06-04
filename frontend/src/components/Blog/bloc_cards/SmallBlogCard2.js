import React from "react";
import "./SmallBlogCard2.scss";
import { useNavigate } from "react-router-dom";

export default function SmallBlogCard({ blog }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/blog/" + blog.id);
  };
  return (
    <div className="article-item" onClick={handleClick}>
      <img
        className="article-image"
        alt={blog ? blog.title : "N/A"}
        src={blog && blog.cover ? blog.cover : ""}
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
