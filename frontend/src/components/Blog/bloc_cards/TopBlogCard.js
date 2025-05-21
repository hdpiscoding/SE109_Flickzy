import React from "react";
import "./TopBlogCard.scss";
import { useNavigate } from "react-router-dom";

export default function TopBlogCard({ blog }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/blog/" + blog.id);
  };
  return (
    <div className="most-viewed-item" onClick={handleClick}>
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
