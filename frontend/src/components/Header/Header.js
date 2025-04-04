import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
export default function Header() {
  return (
    <div>
      <header className="header">
        <nav className="nav">
          <h1 className="logo">FLICKZY</h1>
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
            <div className="signin_btn">Sign In</div>
          </div>
        </nav>
      </header>
    </div>
  );
}
