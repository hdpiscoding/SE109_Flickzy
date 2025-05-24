import React, { useState } from "react";
import Button from "../OtherComponents/Button";
import "./Snack.css"; // Import CSS for styling

export default function Snack({
  handleClose,
  handleOpenPaymentForm,
  initAmount,
}) {
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

  const updateQuantity = (id, value) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, parseInt(value) || 0) }
          : item
      )
    );
  };

  const total =
    initAmount +
    items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div
      onClick={handleClose}
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
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
            margin: 0,
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
                    <button
                      style={{ width: 24, height: 24 }}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, e.target.value)}
                      style={{
                        width: "40px",
                        height: "24px",
                        border: "1px solid #ccc",
                        textAlign: "center",
                        margin: "0 5px",
                      }}
                    />
                    <button
                      style={{ width: 24, height: 24 }}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
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
