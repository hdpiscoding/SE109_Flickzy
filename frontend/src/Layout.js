import React, { useState } from "react";
import { ConfigProvider } from "antd";
import { Outlet } from "react-router-dom";
import "./Layout.css"; // Import CSS
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import FloatingBooking from "./components/Book/FloatingBooking"; // Import FloatingBooking component

const Layout = () => {
  const [isBookingVisible, setIsBookingVisible] = useState(false);

  const handleBookingToggle = () => {
    setIsBookingVisible(true);
  };

  return (
    <ConfigProvider
      className="root-theme"
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#6cc832",
          borderRadius: 8,

          // Alias Token
        },
      }}
    >
      <div className="layout">
        {/* Thanh Taskbar */}
        <Header onBookingClick={handleBookingToggle} />

        {/* Nội dung trang con */}
        <main className="content">
          <Outlet />
        </main>
        <Footer />

        {isBookingVisible && (
          <>
            <div
              className="overlay"
              onClick={() => setIsBookingVisible(false)}
            />
            <FloatingBooking className="floating-booking" />
          </>
        )}
      </div>
    </ConfigProvider>
  );
};

export default Layout;
