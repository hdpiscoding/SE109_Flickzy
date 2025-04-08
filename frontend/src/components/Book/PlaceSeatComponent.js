import React, { useState } from "react";
import Button from "../OtherComponents/Button";
import { IoArrowBack } from "react-icons/io5";
import "./FloatingBooking.css"; // Import CSS for styling
import Snack from "./Snack";
import PaymentForm from "./PaymentForm";
import { useGlobalContext } from "../../Layout";
export default function PlaceSeatComponent() {
  const { handleBack, handleNav, handleClose, step1 } = useGlobalContext();
  const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái hiển thị modal
  const [isPayFormVisible, setIsPayFormVisible] = useState(false); // Trạng thái hiển thị form thanh toán

  const handleBuyNowClick = () => {
    setIsModalVisible(true); // Hiển thị modal
  };

  const handleCloseModal = () => {
    setIsModalVisible(false); // Đóng modal
  };
  // hàm gọi  mở giao diện để thanh toán
  const handlePay = () => {
    setIsPayFormVisible(true); // Hiển thị form thanh toán
  };

  const handleClosePayForm = () => {
    setIsPayFormVisible(false); // Đóng form thanh toán
  };
  const [width, setWidth] = useState(40);
  const [height, setHeight] = useState(15);
  const [screenLength, setScreenLength] = useState(0.7);
  const [seat, setSeat] = useState([
    {
      seat_id: 1,
      room_id: "1",
      seat_type_id: "1",
      name: "A1",
      row: 1,
      columnn: 1,
    },
    {
      seat_id: 2,
      room_id: "1",
      seat_type_id: "1",
      name: "A2",
      row: 1,
      columnn: 2,
    },
    {
      seat_id: 3,
      room_id: "1",
      seat_type_id: "1",
      name: "A3",
      row: 1,
      columnn: 3,
    },
    {
      seat_id: 4,
      room_id: "1",
      seat_type_id: "1",
      name: "A4",
      row: 1,
      columnn: 4,
    },
    {
      seat_id: 5,
      room_id: "1",
      seat_type_id: "1",
      name: "A5",
      row: 1,
      columnn: 5,
    },
    {
      seat_id: 6,
      room_id: "1",
      seat_type_id: "1",
      name: "A6",
      row: 1,
      columnn: 6,
    },
    {
      seat_id: 7,
      room_id: "1",
      seat_type_id: "1",
      name: "A7",
      row: 1,
      columnn: 7,
    },
    {
      seat_id: 8,
      room_id: "1",
      seat_type_id: "1",
      name: "A8",
      row: 1,
      columnn: 8,
    },
    {
      seat_id: 9,
      room_id: "1",
      seat_type_id: "1",
      name: "A9",
      row: 1,
      columnn: 9,
    },
    {
      seat_id: 10,
      room_id: "2",
      seat_type_id: "2",
      name: "B10",
      row: 2,
      columnn: 10,
    },
    {
      seat_id: 11,
      room_id: "2",
      seat_type_id: "2",
      name: "B11",
      row: 2,
      columnn: 12,
    },
  ]);
  const [seatType, setSeatType] = useState([
    {
      id: "1",
      name: "Thường",
      color: "#FF5733",
      height: 1,
      width: 1,
    },
    {
      id: "2",
      name: "VIP",
      color: "#33C1FF",
      height: 1,
      width: 2,
    },
  ]);
  const schedule = [1, 2, 3];
  const [selectedSeats, setSelectedSeats] = useState([]);
  const getSeatStyle = (seatItem) => {
    const type = seatType.find((type) => type.id === seatItem.seat_type_id);
    const isUnavailable = schedule.includes(seatItem.seat_id);
    const isSelected = selectedSeats.includes(seatItem.seat_id);

    return {
      gridRow: `${seatItem.row} / span ${type?.height || 1}`,
      gridColumn: `${seatItem.columnn} / span ${type?.width || 1}`,
      backgroundColor: isUnavailable ? "gray" : type?.color || "gray",

      borderRadius: "4px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: isUnavailable ? "default" : "pointer",
      opacity: isSelected ? 0.4 : 1,
    };
  };

  const handleSeatClick = (seatItem) => {
    if (schedule.includes(seatItem.seat_id)) return; // Do nothing if the seat is unavailable

    if (selectedSeats.includes(seatItem.seat_id)) {
      // Remove seat from selectedSeats if already selected
      setSelectedSeats(selectedSeats.filter((id) => id !== seatItem.seat_id));
    } else {
      if (selectedSeats.length >= 8) {
        alert("Bạn chỉ có thể chọn tối đa 8 ghế ngồi.");
      } else {
        // Add seat to selectedSeats
        setSelectedSeats([...selectedSeats, seatItem.seat_id]);
      }
    }
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          margin: 8,
          alignContent: "center",
          alignItems: "center",
        }}
      >
        {step1 ? (
          <div onClick={handleBack}>
            <IoArrowBack
              onClick={handleNav(0)}
              className="back_btn"
              style={{
                fontSize: 22,
                cursor: "pointer",
                color: "gray",
                padding: 6,
                borderRadius: 20,
              }}
            />{" "}
          </div>
        ) : (
          <></>
        )}

        <div
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          {" "}
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
          }}
        >
          ✕
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#F4F4F4",

          padding: "10px",
          display: "flex",
          justifyContent: "center",

          height: "100%",
        }}
      >
        <div
          style={{
            maxHeight: "70vh",
            maxWidth: "100vw",
            alignContent: "center",
            minHeight: "54vh",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",

            alignItems: "center",
            // Adjust the height as needed
          }}
        >
          <div
            style={{
              backgroundColor: "gray",
              height: 5,
              width: (35 * width + 6 * (width - 1) + 20) * screenLength,
            }}
          ></div>
          <div
            style={{
              textAlign: "center",
              margin: "8px 0px 16px 0px",
              fontSize: 16,
              color: "gray",
            }}
          >
            Screen
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${width}, 30px)`,
              gridTemplateRows: `repeat(${height}, 30px)`,
              gap: "6px",
              position: "relative",
              background: "white",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
              padding: "10px",
              overflowY: "auto",
              overflowX: "auto",
              maxHeight: "60vh",
              maxWidth: "90vw",

              width: "fit-content",
              height: "fit-content",
              borderRadius: "16px",
              alignSelf: "center", // Center vertically
            }}
          >
            {seat.map((s) => (
              <div
                key={s.seat_id}
                style={getSeatStyle(s)}
                onClick={() => handleSeatClick(s)}
              >
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
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: 16,
          }}
        >
          <div
            style={{
              width: 20,
              height: 20,

              backgroundColor: "gray",
              borderRadius: "4px",
              marginRight: 8,
            }}
          ></div>
          <span>Unavailable</span>
        </div>
        {seatType.map((type) => (
          <div
            key={type.id}
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: 16,
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,

                backgroundColor: type.color,
                borderRadius: "4px",
                marginRight: 8,
              }}
            ></div>
            <span style={{ textDecoration: "underline", cursor: "pointer" }}>
              {type.name}
            </span>
          </div>
        ))}
      </div>{" "}
      <div
        style={{
          borderRadius: "0 0 16px 16px",
          padding: "16px 16px",
        }}
      >
        <div style={{ display: "flex", gap: 8 }}>
          <div
            style={{
              fontSize: 12,
              backgroundColor: "#6cc832",
              color: "white",
              padding: 1,
              fontWeight: "bold",
              borderRadius: 2,
              width: 30,
              lineHeight: "20px",
              height: "fit-content",

              textAlign: "center",
            }}
          >
            C12
          </div>
          <div
            style={{
              fontSize: 20,

              fontWeight: "bold",
              fontFamily: '"Aminute", sans-serif',
            }}
          >
            InterSttellar{" "}
          </div>
        </div>
        <div
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "#4B8C22",
            fontFamily: '"Aminute", sans-serif',
            marginTop: 8,
          }}
        >
          21:50 ~ 00:39 · Hôm nay, 07/04 · Phòng chiếu IMAX with Laser · 2D Phụ
          đề
        </div>
        <hr
          style={{
            backgroundColor: "#CCCCCC",
            height: "1px",
            border: "none",
            marginTop: 8,
          }}
        ></hr>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {" "}
          <div
            style={{ margin: "8px 0px", color: "#7B7B7B", fontWeight: "bold" }}
          >
            Seats
          </div>
          <div
            style={{
              display: "flex",
              gap: 8,
            }}
          >
            {selectedSeats.map((id) => {
              const seatItem = seat.find((s) => s.seat_id === id);
              return (
                <div
                  style={{
                    color: "#4B8C22",
                    border: "1px solid #4B8C22",
                    borderRadius: "4px",
                    fontWeight: "bold",
                    padding: "4px 8px",
                  }}
                  key={id}
                >
                  {seatItem?.name}
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
          }}
        ></hr>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            {" "}
            <div style={{ color: "#7B7B7B", fontWeight: "bold" }}> Price</div>
            <div
              style={{
                fontSize: 22,
                fontWeight: "bold",
                marginTop: 8,
              }}
            >
              0 đ
            </div>
          </div>
          <Button
            text="Buy Now"
            fontSize={17}
            onClick={handleBuyNowClick}
          ></Button>{" "}
        </div>
      </div>
      {/* Modal */}
      {isModalVisible && (
        <Snack
          handleClose={() => {
            setIsModalVisible(false);
          }}
          handleOpenPaymentForm={() => {
            setIsPayFormVisible(true);
          }}
        ></Snack>
      )}
      {isPayFormVisible && (
        <PaymentForm
          handleClose={() => {
            setIsPayFormVisible(false);
          }}
        ></PaymentForm>
      )}
    </div>
  );
}
