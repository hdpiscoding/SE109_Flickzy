import React from "react";
import ReactMarkdown from "react-markdown";
import "./DetailBlog.scss";
import SmallBlogCard from "./bloc_cards/SmallBlogCard";
import { Col, Image, Row } from "antd";

const markdownContent = `
# Những bộ phim kinh dị 2021 đáng sợ được mong chờ

Tháng này có rất nhiều phim kinh dị ra rạp để chiêu đãi lòng các tín đồ cuồng phim, đặc biệt là thể loại này. Hãy cùng MoMo điểm qua các phim kinh dị đáng mong đợi nhất trong tháng này nhé.

## Tổng hợp phim kinh dị hay nhất
- **Top 20 phim bảo tủ đáng xem nhất thời đại**
- [Review Light Shop (2024): Siêu Phẩm Kinh Dị Hàn Quốc Trên Disney+](#)
- Top phim hay nhất của Stephen King bạn nên xem ngay
- Những bộ phim về quỷ Satan nhất định phải xem
- Những bộ phim về cá sấu đáng sợ nhất trên màn ảnh
`;
export default function DetailBlog() {
  return (
    <div className="container">
      <div className="detail-blog">
        <Image
          height={400}
          className="cinema-logo"
          src="https://homepage.momocdn.net/blogscontents/momo-upload-api-211108155331-637719836118631788.jpg"></Image>
        <div className="blog-info">
          <span>8 phút đọc</span> · <span>121.1K lượt xem</span>
        </div>
        <Row gutter={24}>
          {" "}
          <Col xs={24} sm={16} md={18}>
            <ReactMarkdown>{markdownContent}</ReactMarkdown>
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
