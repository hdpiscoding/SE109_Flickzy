import React, { useEffect, useState } from "react";
import { Card, Row, Col, Spin } from "antd";
import Button from "../OtherComponents/Button";
import { getAllBlog } from "../../services/BlogService";
import { useNavigate } from "react-router-dom";

const BlogHome = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await getAllBlog({ page: 1, limit: 8 });
        setBlogs(res?.data || []);
      } catch (e) {
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div
      style={{
        padding: 24,
        backgroundColor: "transparent",
        minHeight: 300,
      }}>
      {loading ? (
        <div style={{ textAlign: "center", padding: 40 }}>
          <Spin size="large" tip="Đang tải..." />
        </div>
      ) : (
        <>
          <Row gutter={[16, 16]}>
            {blogs.map((blog) => (
              <Col key={blog.id} xs={24} sm={12} lg={6}>
                <Card
                  hoverable
                  onClick={() => {
                    navigate(`/blog/${blog.id}`);
                  }}
                  style={{ marginBottom: 16 }}
                  cover={
                    <img
                      alt={blog.title}
                      src={blog.cover}
                      style={{ height: 160, objectFit: "cover" }}
                    />
                  }>
                  <Card.Meta
                    title={<span style={{ fontSize: 14 }}>{blog.title}</span>}
                    description={
                      <span style={{ fontSize: 12, color: "#888" }}>
                        {blog.views} lượt xem
                      </span>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
          <div style={{ textAlign: "center", marginTop: 40, marginBottom: 12 }}>
            <Button text={"Xem thêm"}></Button>
          </div>
        </>
      )}
    </div>
  );
};

export default BlogHome;
