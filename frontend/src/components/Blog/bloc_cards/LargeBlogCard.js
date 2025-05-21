import React from "react";
import { useNavigate } from "react-router-dom";
import "./LargeBlogCard.scss";

export default function LargeBlogCard({ blog }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/blog/" + blog.id);
  };
  return (
    <div className="highlight-item" onClick={handleClick}>
      <img
        className="highlight-image"
        src={blog && blog.cover ? blog.cover : ""}
      />
      <div className="titlee">{blog ? blog.title : "N/A"}</div>
      <div className="view">
        {blog && blog.views ? blog.views : "N/A"} lượt xem
      </div>
      <div className="description">
        {blog && blog.description ? blog.description : "N/A"}
      </div>
    </div>
  );
}
