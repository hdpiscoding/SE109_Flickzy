import React, { useState } from "react";
import Button from "../OtherComponents/Button";
import "./PaymentForm.css"; // Import CSS for styling
import { useGlobalContext } from "../../Layout";
export default function PaymentForm({ handleClose, seats, snacks }) {
  const { ticketData } = useGlobalContext();
  const handlePriceSeats = (seats) => {
    if (!Array.isArray(seats)) return 0;
    return seats.reduce((total, seat) => {
      return total + (seat.seatTypeId?.price || 0);
    }, 0);
  };
  const handlePriceSnacks = (snacks) => {
    if (!Array.isArray(snacks)) return 0;
    return snacks.reduce((total, snack) => {
      return total + (snack.price * snack.quantity || 0);
    }, 0);
  };

  const formatMoney = (amount) => {
    if (typeof amount !== "number") return "0 đ";
    return amount.toLocaleString("vi-VN") + " đ";
  };

  const items = [];
  const fommatTime = (time) => {
    if (!time) return "";
    const [hourStr, minuteStr] = time.split(":");
    let hour = parseInt(hourStr, 10);
    const minute = minuteStr;
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${minute} ${ampm}`;
  };
  const ageRatingColors = {
    P: "#4CAF50",
    "13+": "#FFA500",
    "16+": "#FF8C00",
    "18+": "#FF3B30",
  };
  return (
    <div
      onClick={handleClose} // Gọi handleClose khi nhấp vào nền
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)", // Đặt vị trí cx là top left của màn hình
        width: "100vw", // Chiều rộng bằng 100% màn hình
        height: "100vh", // Chiều cao bằng 100% màn hình

        backgroundColor: "rgba(0, 0, 0, 0.5)", // Làm tối nền
        display: "flex",
        backdropFilter: "blur(8px)",
        justifyContent: "center",
        alignItems: "center",
        transition: "all 0.3s ease-in-out",
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()} // Ngăn sự kiện click lan xuống nền
        style={{
          backgroundColor: "white",

          borderRadius: 8,

          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        {" "}
        <div style={{ display: "flex", minWidth: 1000 }}>
          {/* LEFT */}
          <div className="ticket-left">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {" "}
              <div className="movie-title">
                <span
                  className="age-badge"
                  style={{
                    backgroundColor:
                      ageRatingColors[ticketData.movieInfo.ageRating],
                  }}
                >
                  {ticketData.movieInfo.ageRating}
                </span>{" "}
                {ticketData.movieInfo.movieName}
              </div>
              <div>2D Phụ đề</div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {" "}
              <div>
                <div
                  className="info-row"
                  style={{ fontWeight: "bold", fontSize: 17 }}
                >
                  {ticketData.cinema.cinemaName}
                </div>
                <div
                  style={{ color: "gray", whiteSpace: "normal", maxWidth: 550 }}
                >
                  {" "}
                  {ticketData.cinema.cinemaAddress}
                  <span
                    style={{
                      color: "#4B8C22",
                      cursor: "pointer",
                      textDecoration: "underline",
                      marginLeft: 8,
                    }}
                  >
                    Map
                  </span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column  ",
                  gap: 8,
                  alignItems: "center",
                }}
              >
                {" "}
                <div
                  style={{
                    backgroundColor: "#9cee69",
                    fontSize: 24,
                    fontFamily: "'Antonio', sans-serif",
                    fontWeight: "bold",
                    height: "fit-content",
                    transform: "translateY(-3px)",
                    width: "fit-content",
                    padding: "1px 5px",
                  }}
                >
                  {ticketData.scheduleInfo.roomName}
                </div>
                <div>ROOM</div>
              </div>
            </div>
            <div
              style={{
                fontWeight: "bold",
                fontSize: 22,
                marginBottom: 4,
                marginTop: 4,
              }}
            >
              {fommatTime(ticketData.scheduleInfo.scheduleStart)} -{" "}
              {fommatTime(ticketData.scheduleInfo.scheduleEnd)}{" "}
              {ticketData.scheduleInfo.scheduleDate}
            </div>

            <div className="section-title">SEATS</div>
            <div className="item-row">
              <div style={{ display: "flex" }}>
                {seats.map((seat, index) => (
                  <span key={index}>
                    {seat.name}
                    {index < seats.length - 1 ? ", " : ""}
                  </span>
                ))}
              </div>
              <span>{formatMoney(handlePriceSeats(seats))}</span>
            </div>

            <div className="section-title">POPCORN & DRINKS</div>
            {snacks.map(
              (snacks) =>
                snacks.quantity > 0 && (
                  <div className="item-row" key={snacks.id}>
                    <span>
                      {snacks.name} x{snacks.quantity}
                    </span>
                    <span>{formatMoney(snacks.price * snacks.quantity)}</span>
                  </div>
                )
            )}

            <div
              className="total-row"
              style={{ alignItems: "center", display: "flex", gap: 8 }}
            >
              <div>
                <span>TOTAL AMOUNT</span>
                <div className="note">
                  Ưu đãi (nếu có) sẽ được áp dụng ở bước thanh toán.
                </div>
              </div>

              <span style={{ fontSize: 30 }}>
                {" "}
                {formatMoney(
                  handlePriceSeats(seats) + handlePriceSnacks(snacks)
                )}
              </span>
            </div>
          </div>

          {/* RIGHT */}
          <div className="ticket-right">
            <div className="close-btn" onClick={handleClose}>
              ✕
            </div>

            <div className="qr-box">
              <img src="/images/momo-qr.png" alt="QR MoMo" className="qr-img" />
            </div>
            <div className="momo-note">
              Sử dụng App MoMo hoặc <br />
              ứng dụng Camera hỗ trợ QR code để quét mã.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
