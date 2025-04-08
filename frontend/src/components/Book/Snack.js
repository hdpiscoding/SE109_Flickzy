import React, { useState } from "react";
import Button from "../OtherComponents/Button";
import "./Snack.css"; // Import CSS for styling
export default function Snack({ handleClose, handleOpenPaymentForm }) {
  const initialItems = [
    {
      id: 1,
      name: "Combo Nhà Gấu",
      price: 259000,
      description: "4 Coke 22oz + 2 Bắp 2 Ngăn 64OZ Phô Mai + Caramel",
      image: "combo1.png",
      quantity: 0,
    },
    {
      id: 2,
      name: "Combo 2 Coke 32oz",
      price: 259000,
      description: "2 Coke 32oz + 1 Bắp 2 Ngăn 64OZ Phô Mai + Caramel",
      image: "combo2.png",
      quantity: 0,
    },
    {
      id: 3,
      name: "Sprite 32oz",
      price: 37000,
      description: "",
      image: "sprite.png",
      quantity: 0,
    },
    {
      id: 4,
      name: "Coke Zero 32oz",
      price: 37000,
      description: "",
      image: "cokezero.png",
      quantity: 0,
    },
    {
      id: 5,
      name: "Coke 32oz",
      price: 37000,
      description: "",
      image: "coke.png",
      quantity: 0,
    },
  ];
  const [items, setItems] = useState(initialItems);

  const updateQuantity = (id, delta) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      )
    );
  };
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div
      // Gọi handleClose khi nhấp vào nền
      onClick={handleClose}
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)", // Đặt vị trí cx là top left của màn hình
        width: "100vw", // Chiều rộng bằng 100% màn hình
        height: "100vh", // Chiều cao bằng 100% màn hình

        backgroundColor: "rgba(0, 0, 0, 0.5)", // Làm tối nền
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()} // Ngăn sự kiện click lan xuống nền
        style={{
          backgroundColor: "white",
          padding: 16,
          borderRadius: 8,
          width: "400px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div
          style={{
            display: "flex",
            margin: 8,
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              flex: 1,
              textAlign: "center",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {" "}
            Popcorn & Drinks
          </div>
          <div
            onClick={handleClose}
            className="close_btn"
            style={{
              fontSize: 22,
              color: "gray",
              cursor: "pointer",
              fontWeight: "bold",
              marginLeft: "8 !important",
              transform: "translateY(-5px)",
            }}
          >
            ✕
          </div>
        </div>
        <div className="combo-container">
          <div className="item-list">
            {items.map((item) => (
              <div className="item" key={item.id}>
                <img
                  src={`/images/${item.image}`}
                  alt={item.name}
                  className="item-image"
                />
                <div className="item-info">
                  <div className="item-title">
                    {item.name} - {item.price.toLocaleString()}đ
                  </div>
                  {item.description && (
                    <div className="item-desc">{item.description}</div>
                  )}
                  <div className="quantity-control">
                    <button onClick={() => updateQuantity(item.id, -1)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}>
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pfooter">
            <div className="total">
              <span>Total amount</span>
              <span>{total.toLocaleString()}đ</span>
            </div>
            <Button
              text="Pay"
              isFullWidth={true}
              onClick={handleOpenPaymentForm}
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
}
