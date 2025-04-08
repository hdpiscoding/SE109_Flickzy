import React from "react";
import "./Latest.scss"; // Import CSS file for styling
import LargeBlogCard from "../bloc_cards/LargeBlogCard";
import SmallBlogCard from "../bloc_cards/SmallBlogCard";
import TopBlogCard from "../bloc_cards/TopBlogCard";
import { Row, Col } from "antd";

export default function Latest() {
  return (
    <div className="theatrical-movie-container">
      <div className="highlight-section">
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={24} md={12} lg={8}>
            <LargeBlogCard />
          </Col>
          <Col xs={24} sm={24} md={12} lg={8}>
            <LargeBlogCard />
          </Col>
          <Col xs={24} sm={24} md={12} lg={8}>
            <LargeBlogCard />
          </Col>
        </Row>
      </div>
      <hr />

      <div className="content-section">
        <Row gutter={[16, 16]} justify="center" wrap>
          <Col lg={16} md={16} xs={24} sm={24} className="latest-articles">
            <h4>Bài viết mới nhất</h4>
            <SmallBlogCard /> <hr />
            <SmallBlogCard /> <hr />
            <SmallBlogCard /> <hr />
            <SmallBlogCard /> <hr />
            <SmallBlogCard /> <hr />
            <button className="load-more">Xem thêm</button>
          </Col>

          <Col lg={8} md={8} xs={24} sm={24} className="most-viewed">
            <h4>Xem nhiều nhất</h4>
            <TopBlogCard /> <hr />
            <TopBlogCard /> <hr />
            <TopBlogCard /> <hr />
          </Col>
        </Row>
      </div>
    </div>
  );
}
