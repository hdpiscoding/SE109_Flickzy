import React, { use, useEffect, useState } from "react";
import Button from "../OtherComponents/Button";
import { IoArrowBack } from "react-icons/io5";
import "./FloatingBooking.css"; // Import CSS for styling
import Snack from "./Snack";
import PaymentForm from "./PaymentForm";
import { Spin } from "antd"; // Import Spin from Ant Design
import { useGlobalContext } from "../../Layout";
import { getARoom, getAllSeatsByRoomId } from "../../services/BookingService";
import { calc } from "antd/es/theme/internal";
export default function PlaceSeatComponent() {
  const [roomId, setRoomId] = useState("c79f5918-489f-409c-b9ba-9215da84f3ad");
  const { handleBack, handleNav, handleClose, step1 } = useGlobalContext();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái hiển thị modal
  const [isPayFormVisible, setIsPayFormVisible] = useState(false); // Trạng thái hiển thị form thanh toán
  const [screenLength, setScreenLength] = useState(0.7);
  const [seat, setSeat] = useState([]);
  const [seatType, setSeatType] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const schedule = [1, 2, 3];
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    //Api get a room
    const fetchRoomData = async () => {
      const response = await getARoom(roomId);
      setHeight(response.height);
      setWidth(response.width);
    };
    const fetchSeatData = async () => {
      const response = await getAllSeatsByRoomId(roomId);
      setSeat(response);
    };

    fetchRoomData();
    fetchSeatData();
  }, []);
  useEffect(() => {
    const getAllSeatStyle = () => {
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
    };
    getAllSeatStyle();
    setIsLoading(false);
  }, [seat]);
  useEffect(() => {
    const total = selectedSeats.reduce(
      (sum, seat) => sum + (seat.seatTypeId.price || 0),
      0
    );
    setTotalAmount(total);
  }, [selectedSeats]);

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

  const getSeatStyle = (seatItem) => {
    const type = seatItem.seatTypeId;
    const isUnavailable = schedule.includes(seatItem.seat_id);
    const isSelected = selectedSeats.includes(seatItem);

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
    if (schedule.includes(seatItem.seat_id)) {
      return; // Không làm gì nếu ghế không khả dụng
    }

    const isSelected = selectedSeats.includes(seatItem);
    if (isSelected) {
      setSelectedSeats((prev) => prev.filter((s) => s !== seatItem)); // Bỏ chọn ghế
    } else {
      if (selectedSeats.length >= 8) {
        alert("Maxiumum 8 seats can be selected"); // Thông báo nếu đã chọn đủ số ghế
      } else {
        setSelectedSeats((prev) => [...prev, seatItem]);
      } // Chọn ghế
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh", // Chiều cao toàn màn hình
      }}
    >
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Spin size="large" /> {/* Hiển thị vòng tròn loading */}
        </div>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              flex: "0 0 auto",
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
              flex: "1 1 auto", // Phần này sẽ co giãn
              overflowY: "auto", // Thêm cuộn dọc nếu nội dung quá lớn
            }}
          >
            <div
              style={{
                backgroundColor: "#F4F4F4",

                padding: "10px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  alignContent: "center",

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
                      width: `calc(${type.width * 20}px)`,
                      height: `calc(${type.height * 20}px)`,

                      backgroundColor: type.color,
                      borderRadius: "4px",
                      marginRight: 8,
                    }}
                  ></div>{" "}
                  <span
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                  >
                    {type.name}
                  </span>
                </div>
              ))}
            </div>{" "}
          </div>

          <div
            className="floating-booking-bottom"
            style={{
              borderRadius: "0 0 16px 16px",
              padding: "16px 16px",

              flex: "0 0 auto", // Phần này cố định
              height: "fit-content",
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
              21:50 ~ 00:39 · Hôm nay, 07/04 · Phòng chiếu IMAX with Laser · 2D
              Phụ đề
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
                style={{
                  margin: "8px 0px",
                  color: "#7B7B7B",
                  fontWeight: "bold",
                }}
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
                  return (
                    <div
                      style={{
                        color: "#4B8C22",
                        border: "1px solid #4B8C22",
                        borderRadius: "4px",
                        fontWeight: "bold",
                        padding: "4px 8px",
                      }}
                    >
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
                <div style={{ color: "#7B7B7B", fontWeight: "bold" }}>
                  {" "}
                  Price
                </div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: "bold",
                    marginTop: 5,
                  }}
                >
                  {totalAmount} đ
                </div>
              </div>
              <Button
                text="Buy Now"
                fontSize={17}
                onClick={handleBuyNowClick}
              ></Button>{" "}
            </div>
          </div>
        </>
      )}

      {isModalVisible && (
        <Snack
          handleClose={() => {
            setIsModalVisible(false);
          }}
          handleOpenPaymentForm={() => {
            setIsPayFormVisible(true);
          }}
          initAmount={totalAmount}
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
