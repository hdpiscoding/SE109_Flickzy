import React from "react";
import "./TheatricalMovie.scss"; // Import CSS file for styling
import LargeBlogCard from "../bloc_cards/LargeBlogCard";
import SmallBlogCard from "../bloc_cards/SmallBlogCard";
import TopBlogCard from "../bloc_cards/TopBlogCard";

export default function TheatricalMovie() {
  return (
    <div className="theatrical-movie-container">
      <div className="highlight-section">
        <LargeBlogCard /> <hr />
        <LargeBlogCard /> <hr />
        <LargeBlogCard />
      </div>
      <hr />

      <div className="content-section">
        <div className="latest-articles">
          <h2>Bài viết mới nhất</h2>
          <SmallBlogCard /> <hr />
          <SmallBlogCard /> <hr />
          <SmallBlogCard /> <hr />
          <SmallBlogCard /> <hr />
          <SmallBlogCard />
          <button className="load-more">Xem thêm</button>
        </div>

        <div className="most-viewed">
          <h2>Xem nhiều nhất</h2>
          <TopBlogCard /> <hr />
          <TopBlogCard /> <hr />
          <TopBlogCard />
        </div>
      </div>
      <div className="highlight-section">
        <h2>Danh sách top phim nổi bật</h2>

        <LargeBlogCard />
        <LargeBlogCard />
        <LargeBlogCard />
        <button className="load-more">Xem nhiều hơn</button>
      </div>
    </div>
  );
}
