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
        }}
      >
        {/* Newsletter */}
        <div>
          <h1
            style={{
              color: "#9cee69",
              fontFamily: '"Antonio", sans-serif',
              fontSize: 40,
            }}
          >
            FLICKZY
          </h1>
          <p>Subscribe to get special offers & once-in-a-lifetime deals.</p>
          <form className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your e-mail address here"
              required
            />
            <Button text="→" boderRadius={"0px"} fontSize={22}></Button>
          </form>
        </div>

        <div style={{ display: "flex", gap: 50 }}>
          <div className="footer-section">
            <h4>LINK</h4>
            <ul>
              <li>
                <a href="">Home</a>
              </li>
              <li>
                <a href="movie">Movies</a>
              </li>
              <li>
                <a href="cinema">Cinema</a>
              </li>
              <li>
                <a href="blog">Blogs</a>
              </li>
            </ul>
          </div>

          {/* Assistance */}
          <div className="footer-section">
            <h4>ASSISTANCE</h4>
            <ul>
              <li>
                <a href="#">Terms & Conditions</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Accessibility</a>
              </li>
            </ul>
          </div>

          {/* Boutiques */}
          <div className="footer-section">
            <h4>BOUTIQUES</h4>
            <ul>
              <li>
                <a href="">Booking now</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div style={{ display: "flex", gap: 20 }}>
          <FaInstagram
            style={{ fontSize: 22, cursor: "pointer" }}
          ></FaInstagram>

          <FaFacebookF
            style={{ fontSize: 22, cursor: "pointer" }}
          ></FaFacebookF>

          <FaTiktok style={{ fontSize: 22, cursor: "pointer" }}></FaTiktok>

          <FaXTwitter style={{ fontSize: 22, cursor: "pointer" }}></FaXTwitter>
        </div>

        <p className="copyright">© 2025, Flickzy. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
