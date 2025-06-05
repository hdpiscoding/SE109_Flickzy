import React, { useEffect, useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from "react-router-dom";

import Button from "../OtherComponents/Button";
import "./PaymentForm.css"; // Import CSS for styling
import PaymentSuccess from "./PaymentSucces";

import { useGlobalContext } from "../../Layout";
import {
  checkPayment,
  getLink,
  updateEmail,
} from "../../services/PaymentService";
import { Navigate } from "react-router-dom";
export default function PaymentForm({
  handleClose,
  seats,
  snacks,
  roomId,
  email,
}) {
  const navigate = useNavigate();
  const context = useGlobalContext();
  const { handleNav, setTicketData, ticketData } = context;

  const [qrCode, setQrCode] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [isSucces, setIsSuccess] = useState(false);
  const intervalRef = useRef(null);
  const handlePriceSeats = (seats) => {
    if (!Array.isArray(seats)) return 0;
    return seats.reduce((total, seat) => {
      return total + (seat.seatTypeId?.price || 0);
    }, 0);
  };
  const getUserIdFromAuthStorage = () => {
    const auth = localStorage.getItem("auth-storage");
    if (!auth) return null;
    try {
      const parsed = JSON.parse(auth);
      return parsed?.state?.user?.id || null;
    } catch {
      return null;
    }
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
  const formateDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", options);
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
  const handelOpenMap = () => {
    const address = ticketData.cinema.cinemaAddress;
    const encodedAddress = encodeURIComponent(address);
    const url = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(url, "_blank");
  };
  useEffect(() => {
    if (email) {
    }
    const fetchQRCode = async () => {
      const sum = handlePriceSeats(seats) + handlePriceSnacks(snacks);
      const newSeats = seats.map((seat) => ({
        name: seat.name,
        seatId: seat.seatId,
        row: seat.row,
        column: seat.columnn,
        seat_type_id: seat.seatTypeId?.seatTypeId,
        price: seat.seatTypeId?.price,
        room_id: ticketData.scheduleInfo.roomId,
      }));
      const newSnacks = snacks
        .filter((snack) => snack.quantity > 0)
        .map((snack) => ({
          snackId: snack.id,
          name: snack.name,
          price: snack.price,
          brand_id: snack.brandId,
          quantity: snack.quantity,
        }));
      try {
        const response = await getLink(
          sum,
          "Thanh toán vé xem phim",
          newSeats,
          newSnacks,
          ticketData.scheduleInfo.scheduleId,
          getUserIdFromAuthStorage() ?? null
        );
        setQrCode(response.payUrl);
        setOrderId(response.orderId);
      } catch (error) {
        console.error("Lỗi khi lấy link thanh toán:", error);
      }
    };

    fetchQRCode();
  }, []);

  const checkPaymentStatus = async () => {
    try {
      const response = await checkPayment(orderId);

      if (response.message === "sucess") {
        if (email) await updateEmail(orderId, email);
        setIsSuccess(true);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }
    } catch (error) {
      console.error("Lỗi khi kiểm tra trạng thái thanh toán:", error);
    }
  };

  useEffect(() => {
    if (!orderId) return;
    intervalRef.current = setInterval(() => {
      checkPaymentStatus();
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [orderId]);
  return isSucces ? (
    <PaymentSuccess handleClose={handleClose} />
  ) : (
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
              <div>{ticketData.scheduleInfo.typeName}</div>
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
                    onClick={handelOpenMap}
                    style={{
                      color: "#9cee69",
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
              {formateDate(ticketData.scheduleInfo.scheduleDate)}
            </div>

            <div className="section-title">SEATS</div>
            <div className="item-row">
              <div style={{ display: "flex" }}>
                {seats.map((seat, index) => (
                  <span key={index}>
                    {seat.name}
                    {index < seats.length - 1 ? "\u00A0,\u00A0" : ""}{" "}
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
              <QRCodeCanvas
                value={qrCode}
                size={200}
                level="H"
                includeMargin={true}
              />
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
