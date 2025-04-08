import React from "react";
import "./SmallBlogCard.scss";

export default function SmallBlogCard() {
  return (
    <div className="article-item">
      <div className="article-image" />
      <div className="article-content">
        <div className="article-title">
          Top 11 phim có doanh thu cao nhất mọi thời đại
        </div>
        <div className="article-view">612.1K lượt xem</div>
        <div className="article-description">
          Top 11 phim có doanh thu cao nhất mọi thời đại. Hãy cùng Flickzy điểm
          qua những bộ phim có doanh ...
        </div>
      </div>
    </div>
  );
}
