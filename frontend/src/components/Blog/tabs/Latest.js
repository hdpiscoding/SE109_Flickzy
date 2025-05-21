import React, { useEffect } from "react";
import "./Latest.scss"; // Import CSS file for styling
import LargeBlogCard from "../bloc_cards/LargeBlogCard";
import SmallBlogCard from "../bloc_cards/SmallBlogCard";
import TopBlogCard from "../bloc_cards/TopBlogCard";
import { Row, Col } from "antd";
import { getAllBlog } from "../../../services/BlogService";

export default function Latest() {
  const [blogList, setBlogList] = React.useState([]);
  const [topBlogList, setTopBlogList] = React.useState([]);
  useEffect(() => {
    // Fetch genres
    getAllBlog({})
      .then((data) => setBlogList(Array.isArray(data.data) ? data.data : []))
      .catch((err) => console.error("Error fetching genres:", err));
    getAllBlog({ top: 2 })
      .then((data) => setTopBlogList(Array.isArray(data.data) ? data.data : []))
      .catch((err) => console.error("Error fetching genres:", err));
  }, []);
  return (
    <div className="theatrical-movie-container">
      <div className="highlight-section">
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={24} md={12} lg={8}>
            <LargeBlogCard blog={blogList[0]} />
          </Col>
          <Col xs={24} sm={24} md={12} lg={8}>
            <LargeBlogCard blog={blogList[1]} />
          </Col>
          <Col xs={24} sm={24} md={12} lg={8}>
            <LargeBlogCard blog={blogList[2]} />
          </Col>
        </Row>
      </div>
      <hr />

      <div className="content-section">
        <Row gutter={[16, 16]} justify="center" wrap>
          <Col lg={16} md={16} xs={24} sm={24} className="latest-articles">
            <h4>Bài viết mới nhất</h4>
            {blogList.map((blog, index) => (
              <SmallBlogCard key={index} blog={blog} />
            ))}
            <hr />
            <button className="load-more">Xem thêm</button>
          </Col>

          <Col lg={8} md={8} xs={24} sm={24} className="most-viewed">
            <h4>Xem nhiều nhất</h4>
            {topBlogList.map((blog, index) => (
              <TopBlogCard key={index} blog={blog} />
            ))}
          </Col>
        </Row>
      </div>
    </div>
  );
}
