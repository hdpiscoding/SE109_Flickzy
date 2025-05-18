import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"; // Import the icon
import { Link } from "react-router-dom";
import "./Header.css";
export default function Header({ onBookingClick }) {
  const [isLogin, setIsLogin] = React.useState(false);
  return (
    <div>
      <header
        className="header"
        style={{ alignItems: "center", alignContent: "center" }}
      >
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
              <div>
                <Link className="link" to="/">
                  Home
                </Link>
              </div>
              <div>
                <Link className="link" to="/movie">
                  Movies
                </Link>
              </div>
              <div>
                <Link className="link" to="/cinema">
                  Cinema
                </Link>
              </div>
              <div>
                <Link className="link" to="/blog">
                  Blog
                </Link>
              </div>
            </ul>
            <div className="booking_btn" onClick={onBookingClick}>
              BOOKING NOW!
            </div>
            {isLogin
                ?
                <Link to={"/user/profile"}>
                  <div>Profile</div>
                </Link>
                :
                <div className="signin_btn">Sign In</div>
            }
          </div>
        </nav>
      </header>
    </div>
  );
}
