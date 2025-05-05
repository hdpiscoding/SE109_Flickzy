import React from "react";
import { useNavigate } from "react-router-dom";
import "./LargeBlogCard.scss";

export default function LargeBlogCard() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/blog/1");
  };
  return (
    <div className="highlight-item" onClick={handleClick}>
      <div className="highlight-image" />
      <div className="titlee">
        Phim chiếu rạp 2025 đáng mong đợi dành cho fan cine
      </div>
      <div className="view">32.7K lượt xem</div>
      <div className="description">
        Phim chiếu rạp 2025 đáng mong đợi dành cho fan cine. Hãy cùng Flickzy
        điểm qua...
      </div>
    </div>
  );
}
