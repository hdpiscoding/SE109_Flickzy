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
              <option value="">Chọn tỉnh/thành phố</option>
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
            <Title level={4}>Lịch chiếu phim {selectedCinema}</Title>
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
            <Row gutter={16}>
              <Col>
                <Image
                  src="https://cdn.galaxycine.vn/media/2024/4/4/dia-dao--mat-troi-trong-bong-toi--poster--galaxy-cinema--01_1712222235930.jpg"
                  width={140}
                  height={180}
                  style={{ objectFit: "cover", borderRadius: 8 }}
                  preview={false}
                />
              </Col>
              <Col flex="auto">
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
