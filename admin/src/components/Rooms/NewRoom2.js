import { Button, Input, Select, Form, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { addRoom, addSeat } from "../../services/adminService";
import { getAllCinema } from "../../services/cinemaService";

export default function NewRoom2({ rectangles, height, width }) {
  const [roomName, setRoomName] = useState("");
  const [cinemaId, setCinemaId] = useState(null);
  const [roomType, setRoomType] = useState("");
  const [cinemas, setCinemas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Lấy danh sách rạp từ API
    const fetchCinemas = async () => {
      try {
        const res = await getAllCinema();
        setCinemas(res.data || []);
      } catch (error) {
        setCinemas([]);
      }
      setIsLoading(false);
    };
    fetchCinemas();
  }, []);

  const insertData = async () => {
    if (!roomName || !cinemaId || !roomType) {
      alert("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    try {
      const createRoomRes = await addRoom({
        roomName: roomName,
        roomType: roomType,
        height: height,
        width: width,
        cinemaId: cinemaId, // Lấy từ Select
      });

      for (const rect of rectangles) {
        await addSeat({
          seatTypeId: String(rect.seatTypeId),
          roomId: String(createRoomRes.data.roomId),
          row: Number(rect.row),
          column: Number(rect.col),
          name: String(rect.name),
        });
      }

      alert("Room created successfully!");
      window.location.href = "/room";
    } catch (error) {
      console.error("Error inserting data:", error);
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <div>
          <Form layout="vertical" style={{ marginBottom: "16px" }}>
            <Form.Item label="Room Name" required>
              <Input
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="Enter room name"
              />
            </Form.Item>
            <Form.Item label="Cinema" required>
              <Select
                value={cinemaId}
                onChange={(value) => setCinemaId(value)}
                placeholder="Select a cinema"
                showSearch
                optionFilterProp="children"
              >
                {cinemas.map((cinema) => (
                  <Select.Option key={cinema.id} value={cinema.id}>
                    {cinema.cinemaName} - {cinema.cinemaAddress}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Room Type" required>
              <Input
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                placeholder="Enter room type"
              />
            </Form.Item>
          </Form>

          <div
            style={{
              position: "relative",
              width: `${width * 40 + 40}px`,
              height: `${height * 40 + 40}px`,
              border: "1px solid black",
            }}
          >
            {/* Render the top row for column numbers */}
            <div style={{ display: "flex" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  boxSizing: "border-box",
                  border: "1px solid #ccc",
                  backgroundColor: "#f0f0f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                }}
              ></div>
              {Array.from({ length: width }).map((_, colIndex) => (
                <div
                  key={`col-${colIndex}`}
                  style={{
                    width: "40px",
                    height: "40px",
                    boxSizing: "border-box",
                    border: "1px solid #ccc",
                    backgroundColor: "#f0f0f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                  }}
                >
                  {colIndex + 1}
                </div>
              ))}
            </div>

            {/* Render the grid with row numbers */}
            {Array.from({ length: height }).map((_, rowIndex) => (
              <div key={rowIndex} style={{ display: "flex" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    boxSizing: "border-box",
                    border: "1px solid #ccc",
                    backgroundColor: "#f0f0f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                  }}
                >
                  {rowIndex + 1}
                </div>
                {Array.from({ length: width }).map((_, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    style={{
                      width: "40px",
                      height: "40px",
                      border: "1px solid #ccc",
                      boxSizing: "border-box",
                    }}
                  ></div>
                ))}
              </div>
            ))}

            {/* Render rectangles */}
            {rectangles.map((rect, index) => (
              <div
                key={index}
                style={{
                  position: "absolute",
                  top: `${rect.row * 40}px`,
                  left: `${rect.col * 40}px`,
                  width: `${rect.width * 40}px`,
                  height: `${rect.height * 40}px`,
                  backgroundColor: rect.color,
                  border: "1px solid black",
                }}
              >
                {rect.name}
              </div>
            ))}
          </div>

          <Button onClick={insertData} style={{ marginTop: "16px" }}>
            Insert Data
          </Button>
        </div>
      )}
    </div>
  );
}
