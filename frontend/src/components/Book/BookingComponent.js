// BookingComponent.jsx
import React, { useState, useEffect } from "react";
import { Card, List, Typography, Image, Row, Col } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import { FaRegMap } from "react-icons/fa6";
import "./FloatingBooking.css";
import Search from "antd/es/transfer/search";
import { useGlobalContext } from "../../Layout";

const { Title, Text } = Typography;

const cinemas = [
  "CGV Hùng Vương Plaza",
  "CGV Liberty Citypoint",
  "CGV Sư Vạn Hạnh",
  "CGV Vincom Mega Mall Grand Park",
  "CGV Crescent Mall",
  "CGV Pearl Plaza",
  "CGV Aeon Bình Tân",
];

const dates = ["5", "6", "7", "8", "9", "10", "11"];
const weekdays = [
  "Today",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

const times = [
  { label: "2D Phụ đề", slots: ["21:50 ~ 23:58", "22:50 ~ 00:58"] },
  { label: "2D Phụ đề | 4DX", slots: ["23:10 ~ 01:18"] },
  { label: "2D Phụ đề | GOLD CLASS", slots: ["22:20 ~ 00:28"] },
  { label: "2D Phụ đề | CINE SUITE", slots: ["23:30 ~ 01:30"] },
];

export default function BookingComponent({ haveclosebtn }) {
  const context = useGlobalContext();

  const { handleNav, handleClose } = context;

  const [selectedCinema, setSelectedCinema] = useState(cinemas[0]);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch("https://provinces.open-api.vn/api/");
        const data = await response.json();
        setProvinces(data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };
    fetchProvinces();
  }, []);

  const handleNavigate = () => {
    handleNav(1);
  };

  return (
    <div
      style={{
        maxWidth: 1400,
        margin: "0 auto",
        padding: 20,
        minWidth: 1000,
        backgroundColor: "transparent",
      }}
    >
      <Row align="middle" style={{ marginBottom: 16 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <EnvironmentOutlined
              style={{ color: "#6cc832", marginRight: 8, fontSize: 22 }}
            />
            <select
              onChange={(e) =>
                console.log("Selected province:", e.target.value)
              }
              style={{
                padding: "8px",
                borderRadius: "4px",
                fontSize: "16px",
                border: "1px solid #d9d9d9",
              }}
            >
              <option value="">Select province/city</option>
              {provinces.map((province) => (
                <option key={province.code} value={province.name}>
                  {province.name}
                </option>
              ))}
            </select>
            <div className="neary">
              Near You <FaRegMap />
            </div>
          </div>
          {haveclosebtn && (
            <div
              onClick={handleClose}
              className="close_btn"
              style={{
                fontSize: 22,
                color: "gray",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              ✕
            </div>
          )}
        </div>
      </Row>
      <Row gutter={[16, 16]} style={{ marginBottom: 16, marginLeft: 2 }}>
        {cinemas.map((cinema, index) => (
          <div className="cinema-card" key={index}></div>
        ))}
      </Row>
      <hr style={{ color: "gray", margin: " 16px 0 24px 0" }}></hr>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Search />
          <List
            dataSource={cinemas}
            renderItem={(cinema) => (
              <List.Item
                className={`cinema-item ${
                  cinema === selectedCinema ? "cinema-item-selected" : ""
                }`}
                style={{
                  cursor: "pointer",
                  borderRadius: 8,
                  padding: "8px 8px",
                  marginTop: 8,
                }}
                onClick={() => setSelectedCinema(cinema)}
              >
                <Text
                  style={{
                    fontWeight: cinema === selectedCinema ? "bold" : "normal",
                  }}
                >
                  {cinema}
                </Text>
              </List.Item>
            )}
          />
        </Col>

        <Col
          xs={24}
          md={16}
          style={{ padding: "0 32px", transform: "translateY(-32px)" }}
        >
          <div style={{ margin: "16px 0" }}>
            <Title level={4}>{selectedCinema} movie showtimes</Title>
            <Text type="secondary">Tầng 7 | {selectedCinema}, Hồ Chí Minh</Text>
            <Text
              style={{
                color: "#6cc832",
                textDecoration: "underline",
                marginLeft: 8,
                cursor: "pointer",
              }}
            >
              Map
            </Text>
          </div>

          <div style={{ display: "flex", gap: 8, overflowX: "auto" }}>
            {dates.map((date, index) => (
              <div
                key={index}
                className={
                  index === selectedDateIndex ? "primarybtn" : "defaultbtn"
                }
                onClick={() => setSelectedDateIndex(index)}
              >
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontWeight: "bold", fontSize: 20 }}>{date}</div>
                  <div>{weekdays[index]}</div>
                </div>
              </div>
            ))}
          </div>

          <Card bordered style={{ marginTop: 16 }}>
            <Row gutter={16} s>
              <Col>
                <Image
                  src="data:image/jpeg;base64,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"
                  width={140}
                  height={180}
                  style={{
                    objectFit: "cover",
                    borderRadius: 4,
                    marginRight: 16,
                  }}
                  preview={false}
                />
              </Col>
              <Col flex="auto" style={{ marginLeft: 8 }}>
                <div
                  style={{
                    fontSize: 12,
                    backgroundColor: "#6cc832",
                    color: "white",
                    padding: 1,
                    fontWeight: "bold",
                    borderRadius: 2,
                    width: 30,

                    textAlign: "center",
                  }}
                >
                  16+
                </div>
                <div
                  style={{ fontWeight: "bold", fontSize: 16, marginBottom: 0 }}
                >
                  Địa Đạo: Mặt Trời Trong Bóng Tối
                </div>
                <Text type="secondary">Lịch Sử, Chiến Tranh</Text>
                <div style={{ marginTop: 16 }}>
                  {times.map((time) => (
                    <div key={time.label} style={{ marginBottom: 8 }}>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: "bold",
                          marginBottom: 4,
                        }}
                      >
                        {time.label}
                      </div>
                      <div
                        style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
                      >
                        {time.slots.map((slot) => (
                          <div
                            key={slot}
                            className="slot-button"
                            onClick={handleNavigate}
                            style={{
                              fontSize: 16,
                              padding: "4px 16px",
                              border: "2px solid #9cee69",
                              color: "#4B8C22",
                              cursor: "pointer",
                              fontWeight: "bold",
                              borderRadius: 8,
                            }}
                          >
                            {slot}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
