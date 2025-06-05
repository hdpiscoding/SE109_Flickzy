import React from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentSucces({ handleClose }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        backdropFilter: "blur(8px)",
        justifyContent: "center",
        alignItems: "center",
        transition: "all 0.3s ease-in-out",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: 40,
          minWidth: 350,
          textAlign: "center",
          boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
        }}
      >
        <h2 style={{ color: "#4CAF50", marginBottom: 16 }}>
          Thanh toán thành công!
        </h2>
        <p style={{ marginBottom: 32 }}>
          Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
          <button
            style={{
              padding: "10px 24px",
              borderRadius: 6,
              border: "none",
              background: "#9cee69",
              color: "#222",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/");
              window.location.reload();
            }}
          >
            Về trang chủ
          </button>
          <button
            style={{
              padding: "10px 24px",
              borderRadius: 6,
              border: "none",
              background: "#2196f3",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/user/profile");
              window.location.reload();
            }}
          >
            Chi tiết đặt vé
          </button>
        </div>
        <div style={{ marginTop: 24 }}>
          <button
            style={{
              background: "transparent",
              border: "none",
              color: "#888",
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={handleClose}
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
