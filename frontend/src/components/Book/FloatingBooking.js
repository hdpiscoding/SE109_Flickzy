import React, { useState, useEffect } from "react";
import "./FloatingBooking.css";
import BookingComponent from "./BookingComponent";
import PlaceSeatComponent from "./PlaceSeatComponent";

const FloatingBooking = ({ handleclose, type }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [step, setStep] = useState(type);
  const handleToggle = () => {
    setIsVisible(!isVisible);
  };
  useEffect(() => {
    setStep(type);
  }, [type]);

  return (
    <div className="floating-booking">
      <div className="">
        {step === 0 ? (
          <BookingComponent handleClose={handleclose}></BookingComponent>
        ) : (
          <div className="booking-step-2">
            <PlaceSeatComponent
              handleclose={handleclose}
              handleback={() => {}}
            ></PlaceSeatComponent>
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingBooking;
