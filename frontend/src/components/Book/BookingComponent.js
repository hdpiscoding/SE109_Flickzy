import React, { useState, useEffect } from "react";
import { Card, List, Typography, Image, Row, Col, Spin, Empty } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import { FaRegMap } from "react-icons/fa6";
import "./FloatingBooking.css";
import Search from "antd/es/transfer/search";
import { useGlobalContext } from "../../Layout";
import { getAllBrands, getAllCinemas } from "../../services/BookingService";
import { getScheduleByCinemaAndDate } from "../../services/ScheduleService";

const { Title, Text } = Typography;

const dates = [];
const weekdays = ["Today"];

const times = [
  { label: "2D Phụ đề", slots: ["21:50 ~ 23:58", "22:50 ~ 00:58"] },
  { label: "2D Phụ đề | 4DX", slots: ["23:10 ~ 01:18"] },
  { label: "2D Phụ đề | GOLD CLASS", slots: ["22:20 ~ 00:28"] },
  { label: "2D Phụ đề | CINE SUITE", slots: ["23:30 ~ 01:30"] },
];

export default function BookingComponent({ haveclosebtn }) {
  const [brands, setBrands] = useState([]);
  const [cinemas, setCinemas] = useState([]);
  const [allCinemas, setAllCinemas] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("all");
  const context = useGlobalContext();
  const [schedule, setSchedule] = useState([]);
  const [loadingSchedule, setLoadingSchedule] = useState(false);

  const { handleNav, handleClose, setTicketData } = context;

  const [selectedCinema, setSelectedCinema] = useState(null);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [provinces, setProvinces] = useState([]);
  const ageRatingColors = {
    P: "#4CAF50",
    "13+": "#FFA500",
    "16+": "#FF8C00",
    "18+": "#FF3B30",
  };

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
    const fetchBrands = async () => {
      try {
        const response = await getAllBrands();
        const data = response.data.data;

        const allBrand = {
          id: "all",
          name: "All",
          avatar:
            "https://static.vecteezy.com/system/resources/thumbnails/026/631/971/small/category-icon-symbol-design-illustration-vector.jpg",
        };

        setBrands([allBrand, ...data]);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };
    const fetchCinemas = async () => {
      try {
        const response = await getAllCinemas();
        const data = response.data.data;
        setCinemas(data);
        setAllCinemas(data);
        setSelectedCinema(data[0]);
      } catch (error) {}
    };
    const fetchDates = () => {
      const today = new Date();
      if (dates.length < 7) {
        for (let i = 0; i < 7; i++) {
          const date = new Date(today);
          date.setDate(today.getDate() + i);
          const formattedDate = date.getDate().toString().padStart(2, "0");
          dates.push(formattedDate);
          if (i > 0) {
            weekdays.push(
              date.toLocaleDateString("en-US", { weekday: "long" })
            );
          }
        }
      }
    };
    fetchDates();
    fetchCinemas();
    fetchBrands();
    fetchProvinces();
  }, []);

  const handleNavigate = (idx) => {
    setTicketData({
      cinema: selectedCinema,
      brandId: selectedCinema.brandId,
      scheduleInfo: {
        scheduleId: "a76571de-dd11-4f91-b3a4-2fd80a33ddc5",
        scheduleDate: "2025-05-23",
        scheduleStart: "17:00:00",
        scheduleEnd: "19:00:00",
        roomId: "cccda124-8dd8-44cc-8bc9-1ff692193e05",
        roomType: "Phòng chiếu IMAX with Laser",
        roomName: "05",
      },
      movieInfo: schedule[idx],
    });
    handleNav(1);
  };

  useEffect(() => {
    if (selectedBrand === "all") {
      setCinemas(allCinemas);
      setSelectedCinema(allCinemas[0] || null);
    } else {
      const filteredCinemas = allCinemas.filter(
        (cinema) => cinema.brandId === selectedBrand
      );
      setCinemas(filteredCinemas);
      setSelectedCinema(filteredCinemas[0] || null);
    }
  }, [selectedBrand, allCinemas]);

  useEffect(() => {
    const fetchSchedule = async () => {
      if (!selectedCinema) {
        setSchedule([]);
        return;
      }
      setLoadingSchedule(true);
      try {
        const today = new Date();
        const inputdate = new Date(today);
        inputdate.setDate(today.getDate() + selectedDateIndex);
        const formattedInputDate = inputdate.toISOString().slice(0, 10);
        const response = await getScheduleByCinemaAndDate(
          selectedCinema.id,
          formattedInputDate
        );
        const data = response.data;
        setSchedule(data);
      } catch (error) {
        setSchedule([]);
      } finally {
        setLoadingSchedule(false);
      }
    };
    fetchSchedule();
  }, [selectedCinema, selectedDateIndex]);

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
        {brands.map((brand) => (
          <div
            className={`cinema-card${
              selectedBrand === brand.id ? " cinema-card-selected" : ""
            }`}
            key={brand.id}
            onClick={() => setSelectedBrand(brand.id)}
            style={{
              border:
                selectedBrand === brand.id
                  ? "2px solid #6cc832"
                  : "1px solid #eee",
              boxShadow:
                selectedBrand === brand.id
                  ? "0 2px 8px rgba(108,200,50,0.15)"
                  : "0 1px 4px rgba(0,0,0,0.08)",
              borderRadius: 8,
              padding: 4,
              cursor: "pointer",
              background: selectedBrand === brand.id ? "#f6fff2" : "#fff",
              transition: "all 0.2s",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={brand.avatar}
              style={{
                width: brand.id === "all" ? 35 : 60,
                height: brand.id === "all" ? 35 : 60,
                objectFit: "cover",
                borderRadius: 8,
              }}
              alt={brand.name}
            />
            <div
              style={{
                textAlign: "center",
                fontWeight: selectedBrand === brand.id ? "bold" : "normal",
                color: selectedBrand === brand.id ? "#6cc832" : "#333",
                fontSize: 13,
                marginTop: 4,
              }}
            >
              {brand.name}
            </div>
          </div>
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
                  cinema.cinemaName === selectedCinema?.cinemaName
                    ? "cinema-item-selected"
                    : ""
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
                    fontWeight:
                      cinema.cinemaName === selectedCinema?.cinemaName
                        ? "bold"
                        : "normal",
                  }}
                >
                  {cinema.cinemaName}
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
            <Title level={4}>
              {selectedCinema?.cinemaName} movie showtimes
            </Title>
            <Text type="secondary">{selectedCinema?.cinemaAddress}</Text>
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
                  index === selectedDateIndex ? "primarybtnn" : "defaultbtnn"
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
          <div
            style={{
              maxHeight: haveclosebtn ? "60vh" : 900,
              overflowY: "auto",
              position: "relative",
            }}
          >
            <Spin spinning={loadingSchedule}>
              {!loadingSchedule && schedule.length === 0 ? (
                <Empty
                  description="No schedule available"
                  style={{ marginTop: 40 }}
                />
              ) : (
                <div
                  style={{
                    maxHeight: haveclosebtn ? "60vh" : 900,
                    overflowY: "auto",
                  }}
                >
                  {schedule.map((item, idx) => (
                    <Card
                      bordered
                      style={{ marginTop: 16 }}
                      key={item.id || idx}
                    >
                      <Row gutter={16}>
                        <Col>
                          <Image
                            src={item.moviePoster}
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
                              backgroundColor:
                                ageRatingColors[item.ageRating] || "#6cc832",
                              color: "white",
                              padding: 1,
                              fontWeight: "bold",
                              borderRadius: 2,
                              width: 30,
                              textAlign: "center",
                            }}
                          >
                            {item.ageRating}
                          </div>
                          <div
                            style={{
                              fontWeight: "bold",
                              fontSize: 16,
                              marginBottom: 0,
                              maxWidth: 400,
                              whiteSpace: "normal", // Cho phép xuống dòng
                              wordBreak: "break-word", // Ngắt từ nếu quá dài
                            }}
                          >
                            {item.movieName}
                          </div>
                          <Text type="secondary">{item.genresName}</Text>
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
                                  style={{
                                    display: "flex",
                                    gap: 8,
                                    flexWrap: "wrap",
                                  }}
                                >
                                  {time.slots.map((slot) => (
                                    <div
                                      key={slot}
                                      className="slot-button"
                                      onClick={() => handleNavigate(idx)}
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
                  ))}
                </div>
              )}
            </Spin>
          </div>
        </Col>
      </Row>
    </div>
  );
}
