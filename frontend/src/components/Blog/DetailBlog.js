import React from "react";
import ReactMarkdown from "react-markdown";
import "./DetailBlog.scss";
import SmallBlogCard from "./bloc_cards/SmallBlogCard";
import { Col, Image, Row } from "antd";
import { useParams } from "react-router-dom";
import { getABlog, getAllBlog } from "../../services/BlogService"; // thêm getAllBlog

export default function DetailBlog() {
  const [blog, setBlog] = React.useState({});
  const [relatedBlogs, setRelatedBlogs] = React.useState([]); // state cho bài viết liên quan
  let blogId = useParams().id;
  React.useEffect(() => {
    getABlog(blogId)
      .then((data) => setBlog(data))
      .catch((err) => console.error("Error fetching genres:", err));
    getAllBlog({ top: 5 })
      .then((data) =>
        setRelatedBlogs(Array.isArray(data.data) ? data.data : [])
      )
      .catch((err) => console.error("Error fetching related blogs:", err));
  }, [blogId]);
  return (
    <div className="detail-blog-wrapper">
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
            <Col xs={24} sm={16} md={16}>
              <ReactMarkdown>
                {blog.content ? blog.content : "Đang tải nội dung..."}
              </ReactMarkdown>
            </Col>
            <Col xs={24} sm={8} md={8} className="table-of-contents">
              <div>
                <h2>Bài viết có liên quan</h2>
                {relatedBlogs.length === 0 ? (
                  <div>Đang tải...</div>
                ) : (
                  relatedBlogs.map((item, idx) => (
                    <SmallBlogCard key={item.id || idx} blog={item} />
                  ))
                )}
              </div>
              <button className="load-more">Xem thêm</button>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
