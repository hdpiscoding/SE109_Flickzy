import React from "react";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import "./LargeBlogCard.scss";

export default function LargeBlogCard({ blog }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/blog/" + blog.id);
  };
  return (
    <Card
      hoverable
      className="large-blog-card"
      onClick={handleClick}
      cover={
        <img
          className="highlight-image"
          alt={blog ? blog.title : "N/A"}
          src={blog && blog.cover ? blog.cover : ""}
        />
      }>
      <Card.Meta
        title={
          <span className="large-blog-title">{blog ? blog.title : "N/A"}</span>
        }
        description={
          <>
            <div className="large-blog-views">
              {blog && blog.views ? blog.views : "N/A"} lượt xem
            </div>
            <div className="large-blog-description">
              {blog && blog.description ? blog.description : "N/A"}
            </div>
          </>
        }
      />
    </Card>
  );
}
