import React, { useEffect, useState } from "react";
import Button from "../OtherComponents/Button";
import "./Snack.css";
import { getAvailableSnacks } from "../../services/BookingService";
import { Empty, Spin } from "antd";
export default function Snack({
  handleClose,
  handleOpenPaymentForm,
  initAmount,
  brandId,
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSnacks = async () => {
      setLoading(true);
      try {
        const response = await getAvailableSnacks(brandId);
        const data = await response.data.data;
        setItems(data.map((item) => ({ ...item, quantity: 0 })));
      } catch (error) {
        setItems([]);
        console.error("Error fetching snacks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSnacks();
  }, [brandId]);

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
            {loading ? (
              <Spin></Spin>
            ) : items.length === 0 ? (
              <div style={{ textAlign: "center", padding: 32, color: "#888" }}>
                <Empty
                  description="No snack available"
                  style={{ marginTop: 40 }}
                />
              </div>
            ) : (
              items.map((item) => (
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
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, e.target.value)
                        }
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
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="pfooter">
            <div className="total">
              <span>Total amount</span>
              <span>{total.toLocaleString()}đ</span>
            </div>
            <Button
              text="Pay"
              isFullWidth={true}
              onClick={() => {
                handleOpenPaymentForm(items);
              }}
            ></Button>
          </div>
        </div>
      </div>
      {/* Spinner CSS */}
      <style>
        {`
          .loading-spinner {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #6cc832;
            border-radius: 50%;
            width: 36px;
            height: 36px;
            animation: spin 1s linear infinite;
            margin: 0 auto;
          }
          @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
        `}
      </style>
    </div>
  );
}
