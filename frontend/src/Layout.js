// Layout.jsx
import React, { useState, createContext, useContext, useEffect } from "react";
import { ConfigProvider } from "antd";
import { Outlet } from "react-router-dom";
import "./Layout.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import PlaceSeatComponent from "./components/Book/PlaceSeatComponent";
import BookingComponent from "./components/Book/BookingComponent";
import Trailer from "./components/OtherComponents/Trailer";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const Layout = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [type, setType] = useState(0);
  const [step1, setStep1] = useState(0);
  const [trailerlink, setTrailerlink] = useState("");

  const handleOpen = () => {
    setIsVisible(true);
    setType(0);
    setStep1(1);
  };

  const handleClose = () => {
    setIsVisible(false);
    setStep1(0);
  };

  const handleNav = (tt) => {
    setIsVisible(true);
    setType(1);
  };
  const handleBack = () => {
    setType(0);
  };
  const handleTrailer = () => {
    setIsVisible(true);
    setType(2);
  };

  const sharedProps = {
    handleOpen,
    handleClose,
    handleNav,
    handleBack,
    handleTrailer,
    setType,
    setIsVisible,
    setTrailerlink,
    step1,
  };

  return (
    <GlobalContext.Provider value={sharedProps}>
      <ConfigProvider
        className="root-theme"
        theme={{
          token: {
            colorPrimary: "#6cc832",
            borderRadius: 8,
          },
        }}
      >
        <div className="layout">
          <Header onBookingClick={handleOpen} />
          <main className="content">
            <Outlet context={sharedProps} />
          </main>
          <Footer />

          {isVisible && (
            <>
              <div className="overlay" onClick={handleClose} />
              <div className="floating-booking">
                {type === 0 && <BookingComponent haveclosebtn={true} />}
                {type === 1 && (
                  <div className="booking-step-2">
                    <PlaceSeatComponent handleback={() => setType(0)} />
                  </div>
                )}
              </div>
              <div className="floating-booking-transperant ">
                {type === 2 && <Trailer trailer={trailerlink}></Trailer>}
              </div>
            </>
          )}
        </div>
      </ConfigProvider>
    </GlobalContext.Provider>
  );
};

export default Layout;
