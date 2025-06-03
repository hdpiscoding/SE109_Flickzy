import React, { useEffect, useState } from "react";
import Button from "../OtherComponents/Button";
import { IoArrowBack } from "react-icons/io5";
import "./FloatingBooking.css";
import Snack from "./Snack";
import PaymentForm from "./PaymentForm";
import { Spin } from "antd";
import { useGlobalContext } from "../../Layout";
import {
  getARoom,
  getAllSeatsByRoomId,
  getUnavaiSeat,
} from "../../services/BookingService";

export default function PlaceSeatComponent() {
  const { handleBack, handleNav, handleClose, step1, ticketData } =
    useGlobalContext();
  const [brandId] = useState(ticketData.brandId);
  const [scheduleInfo, setScheduleInfo] = useState(ticketData.scheduleInfo);
  const moviesInfo = ticketData.movieInfo;
  const [snacks, setSnacks] = useState([]);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPayFormVisible, setIsPayFormVisible] = useState(false);
  const [screenLength] = useState(0.7);
  const [seat, setSeat] = useState([]);
  const [seatType, setSeatType] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [booking, setBooking] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const ageRatingColors = {
    P: "#4CAF50",
    "13+": "#FFA500",
    "16+": "#FF8C00",
    "18+": "#FF3B30",
  };

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [unavailRes, roomRes, seatRes] = await Promise.all([
          getUnavaiSeat(scheduleInfo.scheduleId),
          getARoom(scheduleInfo.roomId),
          getAllSeatsByRoomId(scheduleInfo.roomId),
        ]);
        setBooking(unavailRes.data.map((seat) => seat.seatId));
        setHeight(roomRes.data.height);
        setWidth(roomRes.data.width);
        setSeat(seatRes.data);

        // Format schedule info
        const formatTime = (timeStr) => {
          if (!timeStr) return "";
          const [hour, minute] = timeStr.split(":");
          return `${hour}:${minute}`;
        };
        const formatDate = (dateStr) => {
          if (!dateStr) return "";
          const dateObj = new Date(dateStr);
          const today = new Date();
          const isToday =
            dateObj.getDate() === today.getDate() &&
            dateObj.getMonth() === today.getMonth() &&
            dateObj.getFullYear() === today.getFullYear();
          const dayNames = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ];
          const dayName = isToday ? "Today" : dayNames[dateObj.getDay()];
          const day = String(dateObj.getDate()).padStart(2, "0");
          const month = String(dateObj.getMonth() + 1).padStart(2, "0");
          return `${dayName}, ${day}/${month}`;
        };
        setScheduleInfo({
          scheduleId: scheduleInfo.scheduleId,
          scheduleDate: formatDate(scheduleInfo.scheduleDate),
          scheduleStart: formatTime(scheduleInfo.scheduleStart),
          scheduleEnd: formatTime(scheduleInfo.scheduleEnd),
          roomId: scheduleInfo.roomId,
          roomType: scheduleInfo.roomType,
        });
      } catch (err) {
        // handle error
      }
      setIsLoading(false);
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  // Get unique seat types
  useEffect(() => {
    if (!seat.length) return;
    const uniqueSeatTypes = [];
    seat.forEach((seatItem) => {
      if (
        seatItem.seatTypeId &&
        !uniqueSeatTypes.some(
          (type) => type.seatTypeId === seatItem.seatTypeId.seatTypeId
        )
      ) {
        uniqueSeatTypes.push(seatItem.seatTypeId);
      }
    });
    setSeatType(uniqueSeatTypes);
  }, [seat]);

  // Calculate total
  useEffect(() => {
    setTotalAmount(
      selectedSeats.reduce((sum, seat) => sum + (seat.seatTypeId.price || 0), 0)
    );
  }, [selectedSeats]);

  // Seat style
  const getSeatStyle = (seatItem) => {
    const type = seatItem.seatTypeId;
    const isUnavailable = booking.includes(seatItem.seatId);
    const isSelected = selectedSeats.some((s) => s.seatId === seatItem.seatId);
    return {
      gridRow: `${seatItem.row} / span ${type?.height || 1}`,
      gridColumn: `${seatItem.columnn} / span ${type?.width || 1}`,
      backgroundColor: isUnavailable
        ? "gray"
        : isSelected
        ? "#b7e4c7"
        : type?.color || "gray",
      borderRadius: "4px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: isUnavailable ? "not-allowed" : "pointer",
      opacity: isUnavailable ? 0.5 : 1,
      color: isSelected ? "#222" : "#fff",
      border: isSelected ? "2px solid #4B8C22" : "1px solid #ccc",
      fontWeight: isSelected ? "bold" : "bold",
      transition: "all 0.2s",
      userSelect: "none",
    };
  };

  // Seat click
  const handleSeatClick = (seatItem) => {
    if (booking.includes(seatItem.seatId)) return;
    const isSelected = selectedSeats.some((s) => s.seatId === seatItem.seatId);
    if (isSelected) {
      setSelectedSeats((prev) =>
        prev.filter((s) => s.seatId !== seatItem.seatId)
      );
    } else {
      if (selectedSeats.length >= 8) {
        alert("Maxiumum 8 seats can be selected");
      } else {
        setSelectedSeats((prev) => [...prev, seatItem]);
      }
    }
  };

  // Buy now
  const handleBuyNowClick = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat");
      return;
    }
    setIsModalVisible(true);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "97vh",
        position: "relative",
      }}>
      {/* Header luôn hiển thị */}
      <div
        style={{
          display: "flex",
          flex: "0 0 auto",
          margin: 8,
          alignContent: "center",
          alignItems: "center",
        }}>
        {step1 ? (
          <div onClick={handleBack}>
            <IoArrowBack
              onClick={handleNav(0)}
              className="back_btn"
              style={{
                fontSize: 30,
                cursor: "pointer",
                color: "gray",
                padding: 6,
                borderRadius: 20,
              }}
            />{" "}
          </div>
        ) : null}

        <div
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
          }}>
          Buy ticket
        </div>
        <div
          onClick={handleClose}
          className="close_btn"
          style={{
            fontSize: 22,
            fontWeight: "bold",
            color: "gray",
            cursor: "pointer",
            marginRight: 8,
          }}>
          ✕
        </div>
      </div>

      {/* Nội dung và phần dưới */}
      <div
        style={{
          backgroundColor: "#F4F4F4",
          flex: "1 1 auto",
          overflowY: "auto",
          position: "relative",
        }}>
        {isLoading ? (
          <div
            style={{
              minHeight: 300,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Spin size="large" />
          </div>
        ) : (
          <>
            <div
              style={{
                backgroundColor: "#F4F4F4",
                padding: "10px",
                display: "flex",
                justifyContent: "center",
              }}>
              <div
                style={{
                  alignContent: "center",
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}>
                <div
                  style={{
                    backgroundColor: "gray",
                    height: 5,
                    width: (35 * width + 6 * (width - 1) + 20) * screenLength,
                  }}></div>
                <div
                  style={{
                    textAlign: "center",
                    margin: "8px 0px 16px 0px",
                    fontSize: 16,
                    color: "gray",
                  }}>
                  Screen
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${width}, 35px)`,
                    gridTemplateRows: `repeat(${height}, 35px)`,
                    gap: "6px",
                    position: "relative",
                    background: "white",
                    color: "white",
                    fontWeight: "bold",
                    cursor: "pointer",
                    padding: "10px",
                    fontSize: 14,
                    width: "fit-content",
                    height: "fit-content",
                    borderRadius: "16px",
                    alignSelf: "center",
                  }}>
                  {seat.map((s) => (
                    <div
                      key={s.seat_id}
                      style={getSeatStyle(s)}
                      onClick={() => handleSeatClick(s)}>
                      {s.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                backgroundColor: "#F4F4F4",
                justifyContent: "center",
                padding: "8px",
                color: "gray",
                fontSize: 16,
                transform: "translateY(-8px)",
              }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: 16,
                }}>
                <div
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: "gray",
                    borderRadius: "4px",
                    marginRight: 8,
                  }}></div>
                <span>Unavailable</span>
              </div>
              {seatType.map((type) => (
                <div
                  key={type.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: 16,
                  }}>
                  <div
                    style={{
                      width: `calc(${type.width * 20}px)`,
                      height: `calc(${type.height * 20}px)`,
                      backgroundColor: type.color,
                      borderRadius: "4px",
                      marginRight: 8,
                    }}></div>{" "}
                  <span
                    style={{ textDecoration: "underline", cursor: "pointer" }}>
                    {type.name}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Phần dưới cùng */}
      <div
        className="floating-booking-bottom"
        style={{
          borderRadius: "0 0 16px 16px",
          padding: "16px 16px",
          flex: "0 0 auto",
          height: "fit-content",
          background: "#fff",
        }}>
        {isLoading ? (
          <div
            style={{
              minHeight: 100,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}></div>
        ) : (
          <>
            <div style={{ display: "flex", gap: 8 }}>
              <div
                style={{
                  fontSize: 12,
                  backgroundColor:
                    ageRatingColors[moviesInfo.ageRating] || "#6cc832",
                  color: "white",
                  padding: 1,
                  fontWeight: "bold",
                  borderRadius: 2,
                  width: 30,
                  lineHeight: "20px",
                  height: "fit-content",
                  textAlign: "center",
                }}>
                {moviesInfo.ageRating}
              </div>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  fontFamily: '"Aminute", sans-serif',
                }}>
                {moviesInfo.movieName}
              </div>
            </div>
            <div
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#4B8C22",
                fontFamily: '"Aminute", sans-serif',
                marginTop: 8,
              }}>
              {scheduleInfo.scheduleStart} ~ {scheduleInfo.scheduleEnd} ·{" "}
              {scheduleInfo.scheduleDate}· {scheduleInfo.roomType} · 2D Phụ đề
            </div>
            <hr
              style={{
                backgroundColor: "#CCCCCC",
                height: "1px",
                border: "none",
                marginTop: 8,
              }}></hr>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
              <div
                style={{
                  margin: "8px 0px",
                  color: "#7B7B7B",
                  fontWeight: "bold",
                }}>
                Seats
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                }}>
                {selectedSeats.map((id) => {
                  return (
                    <div
                      key={id.seat_id}
                      style={{
                        color: "#4B8C22",
                        border: "1px solid #4B8C22",
                        borderRadius: "4px",
                        fontWeight: "bold",
                        padding: "4px 8px",
                      }}>
                      {id?.name}
                    </div>
                  );
                })}
              </div>
            </div>

            <hr
              style={{
                backgroundColor: "#CCCCCC",
                height: "1px",
                border: "none",
                marginBottom: 8,
              }}></hr>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
              <div>
                <div style={{ color: "#7B7B7B", fontWeight: "bold" }}>
                  Price
                </div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: "bold",
                    marginTop: 5,
                  }}>
                  {totalAmount} đ
                </div>
              </div>
              <Button
                text="Buy Now"
                fontSize={17}
                onClick={handleBuyNowClick}></Button>
            </div>
          </>
        )}
      </div>

      {isModalVisible && (
        <Snack
          handleClose={() => {
            setIsModalVisible(false);
          }}
          handleOpenPaymentForm={(snacks) => {
            setIsPayFormVisible(true);
            setSnacks(snacks);
          }}
          initAmount={totalAmount}
          brandId={brandId}></Snack>
      )}
      {isPayFormVisible && (
        <PaymentForm
          seats={selectedSeats}
          handleClose={() => {
            setIsPayFormVisible(false);
          }}
          snacks={snacks}></PaymentForm>
      )}
    </div>
  );
}
