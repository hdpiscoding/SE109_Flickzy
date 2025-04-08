import React, { useState } from "react";
import Button from "../OtherComponents/Button";
import "./PaymentForm.css"; // Import CSS for styling
export default function PaymentForm({ handleClose }) {
  const items = [
    ["1 x Nước cam Teppy 327ml", 28000],
    ["1 x Coke 32oz", 37000],
  ];
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
                <span className="age-badge">C16</span> Âm Dương Lộ
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
                  CineStar Hai Bà Trưng
                </div>
                <div style={{ color: "gray" }}>
                  {" "}
                  135 Hai Bà Trưng, P. Bến Nghé, Q.1, TP. HCM{" "}
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
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                {" "}
                <div>ROOM</div>
                <div
                  style={{
                    backgroundColor: "#9cee69",
                    fontSize: 24,

                    fontWeight: "bold",
                    height: "fit-content",
                    width: "fit-content",
                    padding: "1px 5px",
                  }}
                >
                  06
                </div>
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
              2:10 PM - 4:50 PM 1/24/25
            </div>

            <div className="section-title">SEATS</div>
            <div className="item-row">
              <span>D03, D04, E02</span>
              <span>405.000đ</span>
            </div>

            <div className="section-title">POPCORN & DRINKS</div>
            {items.map(([desc, price], i) => (
              <div key={i} className="item-row">
                <span>{desc}</span>
                <span>{price.toLocaleString()}đ</span>
              </div>
            ))}

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

              <span style={{ fontSize: 30 }}> 1.180.000đ</span>
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
