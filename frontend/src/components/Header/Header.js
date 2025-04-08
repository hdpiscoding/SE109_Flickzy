import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"; // Import the icon
import { Link } from "react-router-dom";
import "./Header.css";
export default function Header({ onBookingClick }) {
  return (
    <div>
      <header className="header">
        <nav className="nav">
          <h1 className="logo">FLICKZY</h1>

          <div className="search-container search-input">
            <FontAwesomeIcon className="search-icon" icon={faMagnifyingGlass} />
            <input
              type="text"
              className="search-input2"
              placeholder="Search..."
            />
          </div>
          <div className="right-con">
            <ul className="nav-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/movie">Movies</Link>
              </li>
              <li>
                <Link to="/cinema">Cinema</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
            </ul>
            <div className="booking_btn" onClick={onBookingClick}>
              BOOKING NOW!
            </div>
            <div className="signin_btn">Sign In</div>
          </div>
        </nav>
      </header>
    </div>
  );
}
