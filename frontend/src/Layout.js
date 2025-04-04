import React from "react";
import { Outlet } from "react-router-dom";
import "./Layout.css"; // Import CSS
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
const Layout = () => {
  return (
    <div className="layout">
      {/* Thanh Taskbar */}
      <Header></Header>

      {/* Nội dung trang con */}
      <main className="content">
        <Outlet />
      </main>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
