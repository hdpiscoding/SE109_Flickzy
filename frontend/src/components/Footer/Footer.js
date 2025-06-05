import React from "react";
import "./Footer.css"; // Import CSS riêng
import Button from "../OtherComponents/Button";
import {
  FaInstagram,
  FaFacebookF,
  FaXTwitter,
  FaTiktok,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer">
      <div
        style={{
          display: "flex",
          gap: 20,
          justifyContent: "space-between",
          padding: "0 220px",
          alignContent: "center",
          alignItems: "center",
        }}>
        {/* Newsletter */}
        <div>
          <h1
            style={{
              color: "#9cee69",
              fontFamily: '"Antonio", sans-serif',
              fontSize: 40,
            }}>
            FLICKZY
          </h1>
          <p>Đăng ký nhận ưu đãi đặc biệt & các chương trình hấp dẫn.</p>
          <form className="newsletter-form">
            <input
              type="email"
              placeholder="Nhập địa chỉ email của bạn"
              required
            />
            <Button text="→" boderRadius={"0px"} fontSize={22}></Button>
          </form>
        </div>

        <div style={{ display: "flex", gap: 50 }}>
          <div className="footer-section">
            <h4>LIÊN KẾT</h4>
            <ul>
              <li>
                <a href="">Trang chủ</a>
              </li>
              <li>
                <a href="movie">Phim</a>
              </li>
              <li>
                <a href="cinema">Rạp chiếu</a>
              </li>
              <li>
                <a href="blog">Blog</a>
              </li>
            </ul>
          </div>

          {/* Assistance */}
          <div className="footer-section">
            <h4>HỖ TRỢ</h4>
            <ul>
              <li>
                <a href="#">Điều khoản & Điều kiện</a>
              </li>
              <li>
                <a href="#">Chính sách bảo mật</a>
              </li>
              <li>
                <a href="#">Trợ năng</a>
              </li>
            </ul>
          </div>

          {/* Boutiques */}
          <div className="footer-section">
            <h4>ĐẶT VÉ</h4>
            <ul>
              <li>
                <a href="">Đặt vé ngay</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div style={{ display: "flex", gap: 20 }}>
          <FaInstagram
            style={{ fontSize: 22, cursor: "pointer" }}></FaInstagram>

          <FaFacebookF
            style={{ fontSize: 22, cursor: "pointer" }}></FaFacebookF>

          <FaTiktok style={{ fontSize: 22, cursor: "pointer" }}></FaTiktok>

          <FaXTwitter style={{ fontSize: 22, cursor: "pointer" }}></FaXTwitter>
        </div>

        <p className="copyright">© 2025, Flickzy. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
