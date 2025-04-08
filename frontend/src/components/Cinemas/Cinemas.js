import React from "react";
import ReactMarkdown from "react-markdown";
import "./Cinemas.scss";
import { Col, Image, Row } from "antd";

export default function Cinemas() {
  const markdownContent = `
# Đặt vé CGV - Lịch chiếu phim CGV tại MoMo

Du lịch rạp chiếu với combo điện ảnh siêu hoàn tráng! Bạn đã khám phá hết chưa? Chỉ cần **đặt vé CGV TRỰC TIẾP** trên MoMo, một cú chạm tay là xong ngay.

## Giá vé CGV

| Vé 2D Ghế đôi         |               | Thành viên | Người lớn | HSSV       | Người lớn tuổi, trẻ em |
|------------------------|---------------|------------|-----------|------------|-------------------------|
| **Suất đầu**          | Thứ 2 - 5     | 55.000 VND | 95.000 VND|            |                         |
|                        | Thứ 6 - CN    | 55.000 VND | 115.000 VND|           |                         |
| **Suất chiếu trước 17 giờ** | Thứ 2 - 5 | 55.000 VND | 95.000 VND|            |                         |
|                        | Thứ 6 - CN - Ngày lễ | 55.000 VND (Chỉ áp dụng Thứ 6) | 115.000 VND | 85.000 VND | |
| **Suất chiếu sau 17 giờ** | Thứ 2 - 5  | 55.000 VND | 95.000 VND|            |                         |
|                        | Thứ 6 - CN - Ngày lễ | 55.000 VND | 115.000 VND | 85.000 VND | |


## Danh sách Rạp CGV
- CGV Lapen Center Vũng Tàu
- CGV Vincom Mỹ Tho
- CGV Macximax
- CGV Sun Grand Thụy Khuê
- CGV Empire
- CGV Vincom Gò Vấp
- CGV Vincom Trà Vinh
- CGV Vincom Vĩnh Long
- CGV Vincom Rạch Giá
- CGV Vincom Hà Tĩnh
- CGV Vincom Phú Yên
- CGV Vincom Center Bà Triệu

**Lý do bạn nên trải nghiệm đặt vé CGV TRỰC TIẾP trên MoMo:**
- Ứng dụng thông minh tự đề xuất rạp gần nhất và suất chiếu phù hợp.
- Đặt vé tại rạp bạn yêu thích và thanh toán tức thì ngay trên cùng 1 ứng dụng MoMo mà không cần nhập thông tin thẻ ngân hàng, không cần thẻ Visa/Mastercard.
- Thông tin lịch sử đặt vé được lưu ngay trong ví.
- Ưu đãi **3.000đ/vé** đối với khách hàng mới lần đầu đặt vé CGV trên MoMo và **79.000đ/vé** áp dụng cho thành viên Vàng và Bạc.

Tận hưởng phim hay, ghế đẹp với giá siêu đãi và đặt vé trên MoMo ngay thôi!
`;

  return (
    <div>
      {" "}
      <div className="cinema-container">
        <div className="cinema-headerr">
          <Row className="cinema-info container">
            <Col>
              <Image
                width={120}
                className="cinema-logo"
                src="https://homepage.momocdn.net/blogscontents/momo-upload-api-210604170617-637584231772974269.png"></Image>
            </Col>
            <Col className="cinema-details">
              <h2>Lotte Cinema</h2>
              <div>Hệ thống rạp chiếu phim từ Hàn Quốc</div>
              <div className="cinema-rating">
                <span>⭐ 5 / 5</span>
                <span>9218 đánh giá</span>
              </div>
              <p>49 cửa hàng trong hệ thống</p>
            </Col>
          </Row>
        </div>
        <div className="container">
          <div className="cinema-schedule">
            <div className="schedule-title">Lịch chiếu phim Lotte Cinema</div>
            <div className="schedule">aaa</div>
          </div>
          <div className="markdown">
            <ReactMarkdown>{markdownContent}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
