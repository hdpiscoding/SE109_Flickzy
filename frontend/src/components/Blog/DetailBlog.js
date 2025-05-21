import React from "react";
import ReactMarkdown from "react-markdown";
import "./DetailBlog.scss";
import SmallBlogCard from "./bloc_cards/SmallBlogCard";
import { Col, Image, Row } from "antd";
import { useParams } from "react-router-dom";
import { getABlog } from "../../services/BlogService";

export default function DetailBlog() {
  const [blog, setBlog] = React.useState({});
  let blogId = useParams().id;
  React.useEffect(() => {
    // Fetch genres
    getABlog(blogId)
      .then((data) => setBlog(data))
      .catch((err) => console.error("Error fetching genres:", err));
  }, []);
  return (
    <div className="container">
      <div className="detail-blog">
        <Image
          height={400}
          className="cinema-logo"
          src={blog && blog.cover ? blog.cover : ""}></Image>
        <div className="blog-info">
          <span>
            {blog.timeToRead ? `${blog.timeToRead} phút đọc` : "Đang tải..."}
          </span>{" "}
          ·{" "}
          <span>
            {blog.views !== undefined
              ? `${blog.views} lượt xem`
              : "Đang tải..."}
          </span>
        </div>
        <Row gutter={24}>
          {" "}
          <Col xs={24} sm={16} md={18}>
            <ReactMarkdown>
              {blog.content ? blog.content : "Đang tải nội dung..."}
            </ReactMarkdown>
            <div>
              <div>Bài viết có liên quan</div>
              <SmallBlogCard />
              <SmallBlogCard />
              <SmallBlogCard /> <SmallBlogCard />
              <SmallBlogCard />
              <SmallBlogCard /> <SmallBlogCard />
              <SmallBlogCard />
              <SmallBlogCard />
            </div>
            <button className="load-more">Xem thêm</button>
          </Col>
          <Col xs={24} sm={8} md={6} className="table-of-contents">
            <h3>Mục lục</h3>
            <ul>
              <li>
                <a href="#section1">
                  1. Cuốn theo chiều gió - Gone With the Wind (1939)
                </a>
              </li>
              <li>
                <a href="#section2">
                  2. Quá Nhanh Quá Nguy Hiểm - Fast & Furious 7 (2015)
                </a>
              </li>
              <li>
                <a href="#section3">3. Thế thân - Avatar (2009)</a>
              </li>
              <li>
                <a href="#section4">4. Titanic (1997)</a>
              </li>
              <li>
                <a href="#section5">
                  5. Avengers: Hồi kết - Avengers: Endgame (2019)
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </div>
    </div>
  );
}
