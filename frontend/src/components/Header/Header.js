import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"; // Import the icon
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { FaUser } from "react-icons/fa";
import { Dropdown as AntdDropdown, Menu as AntdMenu } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import useAuthStore from "../../store/useAuthStore";
import Login from "../Authenticate/Login";
import Register from "../Authenticate/Register";
import ForgotEnterEmail from "../Authenticate/ForgotEnterEmail";
import { toast } from "react-toastify";
import { getAllBrand } from "../../services/CinemaService";

export default function Header({ onBookingClick }) {
  const { user, isLoggedIn, logout, login } = useAuthStore();
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [cinemas, setCinemas] = useState([]);

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const res = await getAllBrand();
        setCinemas(res?.data || []);
      } catch (error) {
        setCinemas([]);
      }
    };
    fetchCinemas();
  }, []);

  const handleLoginSuccess = ({ user, token }) => {
    login({ user, token });
    setShowLogin(false);
  };

  const handleRegisterSuccess = ({ user, token }) => {
    login({ user, token });
    setShowRegister(false);
  };

  const handleMenuClick = ({ key }) => {
    if (key === "profile") {
      navigate("/user/profile");
    } else if (key === "signout") {
      logout();
      toast.success("Log out successfully!");
      // Add your sign out logic here
    }
  };

  const menu = (
    <AntdMenu
      onClick={handleMenuClick}
      items={[
        {
          key: "profile",
          icon: <UserOutlined />,
          label: "View Profile",
        },
        {
          key: "signout",
          icon: <LogoutOutlined />,
          danger: true,
          label: "Sign Out",
        },
      ]}
    />
  );

  // Tạo menu items cho Cinema dropdown
  const cinemaMenuItems = cinemas.map((cinema) => ({
    key: cinema.id,
    label: (
      <Link className="link" to={`/cinema/${cinema.id}`}>
        {cinema.brandName}
      </Link>
    ),
  }));

  return (
    <div>
      <header
        className="header"
        style={{ alignItems: "center", alignContent: "center" }}>
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
                <AntdDropdown
                  menu={{ items: cinemaMenuItems }}
                  trigger={["hover"]}
                  placement="bottomLeft"
                  arrow
                  overlayClassName="cinema-dropdown">
                  <span className="link" style={{ cursor: "pointer" }}>
                    Cinema
                  </span>
                </AntdDropdown>
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
            {isLoggedIn ? (
              <AntdDropdown overlay={menu} trigger={["click"]}>
                <div style={{ marginLeft: "40px", cursor: "pointer" }}>
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt="avatar"
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        height: "40px",
                        width: "40px",
                        borderRadius: "50%",
                        backgroundColor: "#ddd",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}>
                      <FaUser
                        style={{ height: "20px", width: "20px", color: "#fff" }}
                      />
                    </div>
                  )}
                </div>
              </AntdDropdown>
            ) : (
              <div className="signin_btn" onClick={() => setShowLogin(true)}>
                Sign In
              </div>
            )}
          </div>
        </nav>
      </header>
      {showLogin && (
        <Login
          open={showLogin}
          onClose={() => setShowLogin(false)}
          onLoginSuccess={handleLoginSuccess}
          onShowRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
          onShowForgot={() => {
            setShowLogin(false);
            setShowForgot(true);
          }}
        />
      )}
      {showRegister && (
        <Register
          open={showRegister}
          onClose={() => setShowRegister(false)}
          onRegisterSuccess={handleRegisterSuccess}
          onShowLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}
      {showForgot && (
        <ForgotEnterEmail
          open={showForgot}
          onClose={() => setShowForgot(false)}
          onShowLogin={() => {
            setShowForgot(false);
            setShowLogin(true);
          }}
        />
      )}
    </div>
  );
}
