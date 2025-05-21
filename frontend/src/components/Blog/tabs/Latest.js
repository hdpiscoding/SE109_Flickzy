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
    getAllBlog({
      categoryId: "e3a05d6f-d59c-4b85-87dc-0167d4fc0f6b",
    })
      .then((data) => setBlogList(Array.isArray(data.data) ? data.data : []))
      .catch((err) => console.error("Error fetching genres:", err));
    getAllBlog({ top: 5, categoryId: "e3a05d6f-d59c-4b85-87dc-0167d4fc0f6b" })
      .then((data) => setTopBlogList(Array.isArray(data.data) ? data.data : []))
      .catch((err) => console.error("Error fetching genres:", err));
  }, []);
  return (
    <div className="theatrical-movie-container">
      <div className="highlight-section">
        <Row gutter={[16, 16]} justify="center">
          {blogList.slice(0, 3).map((blog, idx, arr) => {
            let colProps;
            if (arr.length === 1) {
              colProps = { xs: 24, sm: 24, md: 24, lg: 24 };
            } else if (arr.length === 2) {
              colProps = { xs: 24, sm: 24, md: 12, lg: 12 };
            } else {
              colProps = { xs: 24, sm: 24, md: 8, lg: 8 };
            }
            return (
              <Col {...colProps} key={idx}>
                <LargeBlogCard blog={blog} />
              </Col>
            );
          })}
        </Row>
      </div>
      <hr />

      <div className="content-section">
        <Row gutter={[16, 16]} justify="center" wrap>
          <Col lg={16} md={16} xs={24} sm={24} className="latest-articles">
            <h4>Bài viết mới nhất</h4>
            {blogList.slice(3).map((blog, index) => (
              <SmallBlogCard key={index + 3} blog={blog} />
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
