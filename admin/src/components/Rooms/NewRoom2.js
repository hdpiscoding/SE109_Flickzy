import { Button, Input, Select, Form, Spin } from "antd"; // Import Spin từ Ant Design
import React, { useEffect, useState } from "react";
import { addRoom, addSeat } from "../../services/adminService";

export default function NewRoom2({ rectangles, height, width }) {
  const [roomName, setRoomName] = useState("");
  const [cinemaId, setCinemaId] = useState(null);
  const [roomType, setRoomType] = useState("");
  const [cinemas, setCinemas] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Trạng thái loading

  useEffect(() => {
    // Giả lập fetch dữ liệu
    setTimeout(() => {
      setCinemas([
        { id: 1, name: "Cinema 1" },
        { id: 2, name: "Cinema 2" },
        { id: 3, name: "Cinema 3" },
      ]);
      setIsLoading(false); // Dữ liệu đã tải xong
    }, 1000); // Giả lập thời gian tải
  }, []);

  const insertData = async () => {
    if (!roomName || !cinemaId || !roomType) {
      alert("Please fill in all fields.");
      return;
    }

    setIsLoading(true); // Bắt đầu loading khi insert data
    try {
      const createRoomRes = await addRoom({
        roomName: roomName,
        roomType: roomType,
        height: height,
        width: width,
        cinemaId: "0d31a0d1-c9fb-459b-b673-7a8070ec077d",
      });

      for (const rect of rectangles) {
        await addSeat({
          seatTypeId: String(rect.seatTypeId), // đảm bảo là string
          roomId: String(createRoomRes.data.roomId), // đảm bảo là string
          row: Number(rect.row), // đảm bảo là number
          column: Number(rect.col), // đảm bảo là number
          name: String(rect.name), // đảm bảo là string
        });
      }

      alert("Room created successfully!");
      window.location.href = "/room";
    } catch (error) {
      console.error("Error inserting data:", error);
      alert(error);
    } finally {
      setIsLoading(false); // Kết thúc loading
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
          <Spin size="large" /> {/* Hiển thị vòng tròn loading */}
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
              >
                {cinemas.map((cinema) => (
                  <Select.Option key={cinema.id} value={cinema.id}>
                    {cinema.name}
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
              >
                {/* Ô trống góc trên cùng */}
              </div>
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
                {/* Render the row number */}
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
                {rectangles.name}
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
