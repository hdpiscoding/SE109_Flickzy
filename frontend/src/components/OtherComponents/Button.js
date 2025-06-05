import React from "react";

export default function Button({
  text,
  onClick,
  fontSize,
  isFullWidth,
  boderRadius,
}) {
  return (
    <button
      onClick={onClick}
      style={{
        fontSize: fontSize || "16px",
        color: "black",
        backgroundColor: "#9cee69",
        borderRadius: boderRadius ?? "8px",
        border: "none",
        padding: "10px 20px",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
        width: isFullWidth ? "100%" : "auto",
      }}
      onMouseOver={(e) => (e.target.style.backgroundColor = "#6cc832")}
      onMouseOut={(e) => (e.target.style.backgroundColor = "#9cee69")}>
      {text}
    </button>
  );
}
