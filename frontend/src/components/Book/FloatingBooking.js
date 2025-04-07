import React, { useState } from "react";
import "./FloatingBooking.css";
import BookingComponent from "./BookingComponent";
import PlaceSeatComponent from "./PlaceSeatComponent";

const FloatingBooking = ({ handleclose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [step, setStep] = useState(0);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };
  const handleNavigate = () => {
    setStep(1);
  };

  return (
    <div className="floating-booking">
      <div className="">
        {step === 0 ? (
          <BookingComponent
            parentCallback={handleNavigate}
            handleClose={handleclose}
          ></BookingComponent>
        ) : (
          <div className="booking-step-2">
            <PlaceSeatComponent
              handleback={() => {
                setStep(0);
              }}
              handleclose={handleclose}
            ></PlaceSeatComponent>
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingBooking;
