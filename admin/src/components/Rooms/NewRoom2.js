import { Button } from "antd";
import React, { useEffect } from "react";
import { addRoom, addSeat } from "../../services/adminService";

export default function NewRoom2({ rectangles, height, width }) {
  useEffect(() => {
    alert(JSON.stringify(rectangles));
  }, []);

  const insertData = async () => {
    const createRoomRes = await addRoom({
      name: "Room 1",
      height: height,
      width: width,
    });
    alert(JSON.stringify(createRoomRes));
    for (const rect of rectangles) {
      await addSeat({
        seatTypeId: rect.seatTypeId,
        room: createRoomRes.roomId,

        row: rect.row,
        columnn: rect.col,
        name: rect.name,
      });
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width: `${width * 40 + 40}px`, // Thêm 40px cho cột đánh số
        height: `${height * 40 + 40}px`, // Thêm 40px cho hàng đánh số
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
            top: `${rect.row * 40}px`, // Điều chỉnh để phù hợp với hàng đánh số
            left: `${rect.col * 40}px`, // Điều chỉnh để phù hợp với cột đánh số
            width: `${rect.width * 40}px`,
            height: `${rect.height * 40}px`,
            backgroundColor: rect.color,
            border: "1px solid black",
          }}
        ></div>
      ))}

      <Button onClick={insertData} style={{ marginTop: "16px" }}>
        Insert Data
      </Button>
    </div>
  );
}
