import React, { useState } from "react";

export default function PlaceSeatComponent({ handleback }) {
  const [width, setWidth] = useState(15);
  const [height, setHeight] = useState(50);
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

  const getSeatStyle = (seatItem) => {
    const type = seatType.find((type) => type.id === seatItem.seat_type_id);
    return {
      gridRow: `${seatItem.row} / span ${type?.height || 1}`,
      gridColumn: `${seatItem.columnn} / span ${type?.width || 1}`,
      backgroundColor: type?.color || "gray",
      borderRadius: "4px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };
  };

  return (
    <div>
      <div style={{ display: "flex", margin: 16 }}>
        <button onClick={handleback}>Back to Step 1</button>
        <div>Buy ticket</div>
      </div>
      <div
        style={{
          width: "100%",
          padding: "10px",
          display: "flex",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <div
          style={{
            overflowY: "auto",
            overflowX: "auto",
            maxHeight: "54vh",
            maxWidth: "76vw",
            // Adjust the height as needed
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${width}, 40px)`,
              gridTemplateRows: `repeat(${height}, 40px)`,
              gap: "6px",
              position: "relative",
              background: "#eee",
              padding: "10px",
              border: "1px solid #ccc",
              width: "fit-content",
            }}
          >
            {seat.map((s) => (
              <div key={s.seat_id} style={getSeatStyle(s)}>
                {s.name}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          marginTop: 16,
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
            <span>{type.name}</span>
          </div>
        ))}
      </div>{" "}
      <br></br>
      <hr
        style={{ backgroundColor: "#CCCCCC", height: "1px", border: "none" }}
      ></hr>
      <div
        style={{
          borderRadius: "0 0 16px 16px",
          padding: "16px 16px",
        }}
      >
        <div style={{ display: "flex", gap: 8 }}>
          <div>C12</div>
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
          style={{ margin: "16px 0px", color: "#7B7B7B", fontWeight: "bold" }}
        >
          Chỗ ngồi
        </div>
        <hr
          style={{
            backgroundColor: "#CCCCCC",
            height: "1px",
            border: "none",
            marginBottom: 8,
          }}
        ></hr>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            {" "}
            <div style={{ color: "#7B7B7B", fontWeight: "bold" }}>
              {" "}
              Tạm tính
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: "bold",
                marginTop: 8,
              }}
            >
              0 đ
            </div>
          </div>
          <div>Mua vé</div>{" "}
        </div>
      </div>
    </div>
  );
}
