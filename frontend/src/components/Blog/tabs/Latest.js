import React, { useEffect } from "react";
import "./Latest.scss"; // Import file CSS cho giao diện
import LargeBlogCard from "../bloc_cards/LargeBlogCard";
import SmallBlogCard from "../bloc_cards/SmallBlogCard";
import TopBlogCard from "../bloc_cards/TopBlogCard";
import { Row, Col } from "antd";
import { getAllBlog } from "../../../services/BlogService";

export default function Latest() {
  const [blogList, setBlogList] = React.useState([]);
  const [topBlogList, setTopBlogList] = React.useState([]);
  useEffect(() => {
    // Lấy danh sách bài viết
    getAllBlog({
      categoryId: "e3a05d6f-d59c-4b85-87dc-0167d4fc0f6b",
    })
      .then((data) => setBlogList(Array.isArray(data.data) ? data.data : []))
      .catch((err) => console.error("Lỗi khi lấy danh sách bài viết:", err));
    getAllBlog({ top: 5, categoryId: "e3a05d6f-d59c-4b85-87dc-0167d4fc0f6b" })
      .then((data) => setTopBlogList(Array.isArray(data.data) ? data.data : []))
      .catch((err) =>
        console.error("Lỗi khi lấy danh sách bài viết nổi bật:", err)
      );
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
          {blogList.length > 3 && (
            <Col
              lg={topBlogList.length > 0 ? 16 : 24}
              md={topBlogList.length > 0 ? 16 : 24}
              xs={24}
              sm={24}>
              <h2>Bài viết mới nhất</h2>
              {blogList.slice(3).map((blog, index) => (
                <React.Fragment key={index + 3}>
                  <SmallBlogCard blog={blog} />
                  <hr />
                </React.Fragment>
              ))}
              <button className="load-more">Xem thêm</button>
            </Col>
          )}
          {topBlogList.length > 0 && (
            <Col
              lg={blogList.length > 3 ? 8 : 24}
              md={blogList.length > 3 ? 8 : 24}
              xs={24}
              sm={24}>
              <h2>Xem nhiều nhất</h2>
              {topBlogList.map((blog, index) => (
                <React.Fragment key={index}>
                  <TopBlogCard blog={blog} />
                  {index < topBlogList.length - 1 && <hr />}
                </React.Fragment>
              ))}
            </Col>
          )}
        </Row>
      </div>
    </div>
  );
}
