import React, { useState, useEffect } from "react";
import {
  Card,
  List,
  Typography,
  Image,
  Row,
  Col,
  Spin,
  Empty,
  Input,
} from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import { FaRegMap } from "react-icons/fa6";
import "./FloatingBooking.css";
import { useGlobalContext } from "../../Layout";
import { getAllBrands, getAllCinemas } from "../../services/BookingService";
import { getScheduleByCinemaAndDate } from "../../services/ScheduleService";

const { Title, Text } = Typography;

const dates = [];
const weekdays = ["Today"];

const formatTime = (time) => {
  if (!time) return "";
  const [hourStr, minuteStr] = time.split(":");
  let hour = parseInt(hourStr, 10);
  const minute = minuteStr;
  return `${hour}:${minute}`;
};

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
  const [selectedProvince, setSelectedProvince] = useState("");
  const [searchText, setSearchText] = useState("");
  const [isNearYou, setIsNearYou] = useState(false);
  const [loadingProvince, setLoadingProvince] = useState(false);

  // Mở Google Maps địa chỉ rạp ở tab mới
  const handleOpenMap = () => {
    if (selectedCinema && selectedCinema.cinemaAddress) {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        selectedCinema.cinemaAddress
      )}`;
      window.open(url, "_blank");
    }
  };

  const getProvinceFromLocation = async () => {
    setLoadingProvince(true);
    setIsNearYou(true);
    setSelectedProvince("");
    if (!window.navigator.geolocation) {
      alert("Trình duyệt không hỗ trợ định vị.");
      setLoadingProvince(false);
      setIsNearYou(false);
      return;
    }

    window.navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=vi`;
          const res = await fetch(url, {
            headers: {
              "User-Agent": "YourAppName/1.0 (your@email.com)",
            },
          });
          const data = await res.json();

          if (data && data.address) {
            let province =
              data.address.state || data.address.region || data.address.city;
            if (province) {
              province = province
                .replace(/^Tỉnh\s+/i, "")
                .replace(/^Thành phố\s+/i, "");
              setSelectedProvince(province);
              setIsNearYou(false);
            } else {
              alert("Không xác định được tỉnh/thành phố.");
              setIsNearYou(false);
            }
          } else {
            alert("Không lấy được dữ liệu địa chỉ.");
            setIsNearYou(false);
          }
        } catch (error) {
          alert("Lỗi khi truy xuất dữ liệu từ OpenStreetMap.");
          setIsNearYou(false);
        } finally {
          setLoadingProvince(false);
        }
      },
      (err) => {
        alert("Lỗi khi lấy vị trí: " + err.message);
        setLoadingProvince(false);
        setIsNearYou(false);
      }
    );
  };

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
        let data = await response.json();
        data = data.map((province) => {
          let name = province.name
            .replace(/^Tỉnh\s+/i, "")
            .replace(/^Thành phố\s+/i, "");
          return { ...province, name };
        });
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

  const handleNavigate = (idx, scheduleInfo) => {
    setTicketData({
      cinema: selectedCinema,
      brandId: selectedCinema.brandId,
      scheduleInfo: scheduleInfo,
      movieInfo: schedule[idx],
    });
    handleNav(1);
  };

  // Filter cinemas by brand, province (by cinema.province), and search text
  useEffect(() => {
    let filtered = allCinemas;

    if (selectedBrand !== "all") {
      filtered = filtered.filter((cinema) => cinema.brandId === selectedBrand);
    }

    if (selectedProvince) {
      filtered = filtered.filter(
        (cinema) =>
          cinema.province &&
          cinema.province.toLowerCase() === selectedProvince.toLowerCase()
      );
    }

    if (searchText.trim() !== "") {
      filtered = filtered.filter(
        (cinema) =>
          cinema.cinemaName &&
          cinema.cinemaName.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setCinemas(filtered);
    setSelectedCinema(filtered[0] || null);
  }, [selectedBrand, allCinemas, selectedProvince, searchText]);

  const handleProvinceChange = (e) => {
    setIsNearYou(false);
    setSelectedProvince(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

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
            <div
              style={{
                borderRadius: "4px",
                backgroundColor: selectedProvince ? "#6cc832" : "#d9d9d9",
                transition: "background 0.2s",
                padding: 0,
                display: "flex",
                alignItems: "center",
                border: selectedProvince
                  ? "1.5px solid #6cc832"
                  : "1.5px solid #d9d9d9",
                position: "relative",
              }}
            >
              <select
                value={selectedProvince}
                onChange={handleProvinceChange}
                style={{
                  padding: "8px",
                  borderRadius: "4px",
                  fontSize: "16px",
                  border: "1px solid #d9d9d9",
                  backgroundColor: "#fff",
                  color: "#333",
                  fontWeight: "normal",
                  outline: "none",
                  appearance: "none",
                  minWidth: 180,
                  cursor: "pointer",
                }}
              >
                <option value="">Select province/city</option>
                {provinces.map((province) => (
                  <option key={province.code} value={province.name}>
                    {province.name}
                  </option>
                ))}
              </select>
              {selectedProvince && (
                <span
                  onClick={() => setSelectedProvince("")}
                  style={{
                    position: "absolute",
                    right: 8,
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#888",
                    fontWeight: "bold",
                    fontSize: 14,
                    background: "#fff",
                    borderRadius: "50%",
                    width: 24,
                    height: 24,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid #eee",
                    zIndex: 2,
                  }}
                  title="Xóa chọn"
                >
                  <div>✕</div>
                </span>
              )}
            </div>
            <div
              className="neary"
              onClick={getProvinceFromLocation}
              style={{
                height: 45,
                marginLeft: 8,
                padding: "4px 12px",
                borderRadius: 6,
                background: isNearYou ? "#6cc832" : "#f5f5f5",
                color: isNearYou ? "#fff" : "#333",
                cursor: "pointer",
                fontWeight: isNearYou ? "bold" : "normal",
                display: "flex",
                alignItems: "center",
                transition: "background 0.2s, color 0.2s",
                position: "relative",
              }}
            >
              {loadingProvince && (
                <Spin
                  size="small"
                  style={{
                    marginRight: 8,
                  }}
                />
              )}
              Near You <FaRegMap style={{ marginLeft: 4, fontSize: 20 }} />
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
      <Row gutter={[16, 16]} style={{ marginBottom: 16, marginLeft: 2 }}>
        <Col xs={24} md={8}>
          <Spin spinning={loadingProvince}>
            <Input
              placeholder="Search cinema by name"
              value={searchText}
              onChange={handleSearchChange}
              style={{ marginBottom: 8, borderRadius: 8 }}
              allowClear
            />
            <List
              style={{
                maxHeight: 400,
                overflowY: "auto",
              }}
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
          </Spin>
        </Col>

        <Col
          xs={24}
          md={16}
          style={{ padding: "0 32px", transform: "translateY(-20px)" }}
        >
          <div style={{ margin: "16px 0" }} onClick={handleOpenMap}>
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
              minHeight: 300,
              overflowY: "auto",
              position: "relative",
            }}
          >
            <Spin
              spinning={loadingSchedule}
              style={{ transform: "translateY(100px)" }}
            >
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
                              whiteSpace: "normal",
                              wordBreak: "break-word",
                            }}
                          >
                            {item.movieName}
                          </div>
                          <Text type="secondary">{item.genresName}</Text>
                          <div style={{ marginTop: 16 }}>
                            {/* Nhóm schedules theo typeId */}
                            {Object.values(
                              item.schedules
                                ? item.schedules.reduce((acc, sch) => {
                                    if (!acc[sch.typeId]) {
                                      acc[sch.typeId] = {
                                        typeName: sch.typeName,
                                        slots: [],
                                      };
                                    }
                                    acc[sch.typeId].slots.push({
                                      label: `${formatTime(
                                        sch.scheduleStart
                                      )} ~ ${formatTime(sch.scheduleEnd)}`,
                                      schedule: sch,
                                    });
                                    return acc;
                                  }, {})
                                : {}
                            ).map((group, groupIdx) => (
                              <div
                                key={group.typeName + groupIdx}
                                style={{ marginBottom: 8 }}
                              >
                                <div
                                  style={{
                                    fontSize: 14,
                                    fontWeight: "bold",
                                    marginBottom: 4,
                                  }}
                                >
                                  {group.typeName}
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    gap: 8,
                                    flexWrap: "wrap",
                                  }}
                                >
                                  {group.slots.map((slot, slotIdx) => (
                                    <div
                                      key={slot.label + slotIdx}
                                      onClick={() =>
                                        handleNavigate(idx, slot.schedule)
                                      }
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
                                      {slot.label}
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
