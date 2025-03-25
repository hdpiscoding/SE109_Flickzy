import { useState, useEffect, useRef } from "react";
import { Row, Input, Button, Col, message } from "antd";

export default function RectangleGrid() {
  const [column, setColumn] = useState(0);
  const [row, setRow] = useState(0);
  const [grid, setGrid] = useState([]);
  const [selectedRectangle, setSelectedRectangle] = useState(null);
  const [rectangles, setRectangles] = useState([]);
  const [hoveredCell, setHoveredCell] = useState(null);
  const [newRectangle, setNewRectangle] = useState({
    name: "",
    width: 1,
    height: 1,
    color: "#000000",
  });
  const [selectedGridRectangle, setSelectedGridRectangle] = useState(null);
  const containerRef = useRef(null);
  const gridRef = useRef(null);
  const nameInputRef = useRef(null);
  const [cellSize, setCellSize] = useState(40);
  const [scale, setScale] = useState(1);
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const [predefinedRectangles, setPredefinedRectangles] = useState([
    { name: "Small", width: 1, height: 1, color: "rgb(255, 0, 0)" },
    { name: "Medium", width: 1, height: 1, color: "rgb(0, 255, 0)" },
    { name: "Large", width: 2, height: 1, color: "rgb(0, 0, 255)" },
  ]);

  const handleSubmit = () => {
    const newGrid = Array.from({ length: row }, () =>
      Array.from({ length: column }, () => ({ color: "white" }))
    );
    setGrid(newGrid);
  };

  const placeRectangle = (rowIndex, colIndex) => {
    if (!selectedRectangle) return;

    const { width, height } = selectedRectangle;
    if (
      rowIndex + height > row ||
      colIndex + width > column ||
      rectangles.some(
        (rect) =>
          rowIndex < rect.row + rect.height &&
          rowIndex + height > rect.row &&
          colIndex < rect.col + rect.width &&
          colIndex + width > rect.col
      )
    ) {
      return;
    }

    const newRectangles = [
      ...rectangles,
      { ...selectedRectangle, row: rowIndex, col: colIndex, name: "" },
    ];
    setRectangles(newRectangles);
  };

  const canPlaceRectangle = (rowIndex, colIndex) => {
    if (!selectedRectangle) return false;

    const { width, height } = selectedRectangle;
    if (
      rowIndex + height > row ||
      colIndex + width > column ||
      rectangles.some(
        (rect) =>
          rowIndex < rect.row + rect.height &&
          rowIndex + height > rect.row &&
          colIndex < rect.col + rect.width &&
          colIndex + width > rect.col
      )
    ) {
      return false;
    }

    return true;
  };

  useEffect(() => {
    const updateCellSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;
        const maxCellWidth =
          column > 0 ? (containerWidth / column) * scale : 40;
        const maxCellHeight = row > 0 ? (containerHeight / row) * scale : 40;
        setCellSize(Math.min(maxCellWidth, maxCellHeight));
      }
    };

    updateCellSize();
    window.addEventListener("resize", updateCellSize);
    return () => window.removeEventListener("resize", updateCellSize);
  }, [column, row, scale]);

  const handleWheel = (e) => {
    setScale((prevScale) =>
      Math.max(0.5, Math.min(2, prevScale - e.deltaY * 0.001))
    );
  };

  const handleMouseDown = (e) => {
    setDragging(true);
    setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      setPosition({ x: e.clientX - startPos.x, y: e.clientY - startPos.y });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleAddRectangle = () => {
    if (
      !newRectangle.name ||
      newRectangle.width <= 0 ||
      newRectangle.height <= 0 ||
      !newRectangle.color
    ) {
      message.error("Please fill in all fields correctly.");
      return;
    }
    setPredefinedRectangles([...predefinedRectangles, newRectangle]);
    setNewRectangle({ name: "", width: 1, height: 1, color: "#000000" });
  };

  const handleRectangleClick = (index) => {
    setSelectedGridRectangle(index);
    setTimeout(() => {
      if (nameInputRef.current) {
        nameInputRef.current.focus();
      }
    }, 0);
  };

  const handleDeleteRectangle = () => {
    if (selectedGridRectangle !== null) {
      const newRectangles = rectangles.filter(
        (_, i) => i !== selectedGridRectangle
      );
      setRectangles(newRectangles);
      setSelectedGridRectangle(null);
    }
  };

  const handleNameChange = (e) => {
    if (selectedGridRectangle !== null) {
      const newRectangles = [...rectangles];
      newRectangles[selectedGridRectangle].name = e.target.value;
      setRectangles(newRectangles);
    }
  };

  return (
    <div style={{ display: "flex", height: "60vh" }}>
      <div style={{ flex: 1, padding: 16 }}>
        <Row>
          <Col span={11}>
            <label>Column</label>
            <Input
              type="number"
              placeholder="Column"
              value={column}
              onChange={(e) => setColumn(Number(e.target.value))}
            />
          </Col>
          <Col span={11} style={{ marginLeft: 8 }}>
            <label>Row</label>
            <Input
              type="number"
              placeholder="Row"
              value={row}
              onChange={(e) => setRow(Number(e.target.value))}
            />
          </Col>
          <Col span={24} style={{ marginTop: 16 }}>
            <Button type="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Col>
        </Row>

        <div
          ref={containerRef}
          style={{
            height: "130%",
            flex: 1,
            overflow: "hidden",
            position: "relative",
            border: "1px solid black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 16,
          }}
        >
          <div
            ref={gridRef}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{
              position: "absolute",
              top: position.y,
              left: position.x,
              cursor: dragging ? "grabbing" : "grab",
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
          >
            {grid.map((row, rowIndex) => (
              <div key={rowIndex} style={{ display: "flex" }}>
                {row.map((cell, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    onMouseEnter={() => setHoveredCell({ rowIndex, colIndex })}
                    onMouseLeave={() => setHoveredCell(null)}
                    onClick={() => placeRectangle(rowIndex, colIndex)}
                    style={{
                      width: cellSize,
                      height: cellSize,
                      backgroundColor: cell.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid #000",
                      position: "relative",
                    }}
                  >
                    {hoveredCell &&
                      hoveredCell.rowIndex === rowIndex &&
                      hoveredCell.colIndex === colIndex && (
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: cellSize * selectedRectangle?.width,
                            height: cellSize * selectedRectangle?.height,
                            backgroundColor: canPlaceRectangle(
                              rowIndex,
                              colIndex
                            )
                              ? "rgba(0, 255, 0, 0.3)"
                              : "rgba(255, 0, 0, 0.3)",
                            pointerEvents: "none",
                          }}
                        ></div>
                      )}
                  </div>
                ))}
              </div>
            ))}
            {rectangles.map((rect, index) => (
              <div
                key={index}
                onClick={() => handleRectangleClick(index)}
                style={{
                  position: "absolute",
                  color: "white",
                  top: rect.row * cellSize,
                  left: rect.col * cellSize,
                  width: rect.width * cellSize,
                  height: rect.height * cellSize,
                  backgroundColor: rect.color,
                  border: "1px solid #000",
                  cursor: "pointer",
                }}
              >
                {rect.name}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        style={{
          width: 200,
          padding: 16,
          borderLeft: "1px solid #ccc",
          display: "flex",
          height: "100%",
          flexDirection: "column",
        }}
      >
        <Button
          style={{
            height: 40,
            width: "100%",
          }}
        >
          Create room
        </Button>
        <h4>Select Rectangle</h4>
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            maxHeight: "300px",
            minHeight: "300px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {predefinedRectangles.map((rect) => (
              <div
                key={rect.name}
                onClick={() => setSelectedRectangle(rect)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  padding: 8,
                  border:
                    selectedRectangle?.name === rect.name
                      ? "2px solid blue"
                      : "1px solid #ccc",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: rect.color,
                    marginRight: 8,
                  }}
                ></div>
                <div>
                  <div>{rect.name}</div>
                  <div>{`W: ${rect.width}, H: ${rect.height}`}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 16 }}>
          <hr></hr>
          <h4>Add Rectangle</h4>
          <Input
            placeholder="Name"
            value={newRectangle.name}
            onChange={(e) =>
              setNewRectangle({ ...newRectangle, name: e.target.value })
            }
            style={{ marginBottom: 8 }}
          />
          <Input
            type="number"
            placeholder="Width"
            value={newRectangle.width}
            onChange={(e) =>
              setNewRectangle({
                ...newRectangle,
                width: Number(e.target.value),
              })
            }
            style={{ marginBottom: 8 }}
          />
          <Input
            type="number"
            placeholder="Height"
            value={newRectangle.height}
            onChange={(e) =>
              setNewRectangle({
                ...newRectangle,
                height: Number(e.target.value),
              })
            }
            style={{ marginBottom: 8 }}
          />
          <Input
            type="color"
            value={newRectangle.color}
            onChange={(e) =>
              setNewRectangle({ ...newRectangle, color: e.target.value })
            }
            style={{ marginBottom: 8 }}
          />
          <Button type="primary" onClick={handleAddRectangle}>
            Add Rectangle
          </Button>
        </div>

        {selectedGridRectangle !== null && (
          <div style={{ marginTop: 16, flexShrink: 0 }}>
            <hr></hr>
            <h4>Edit Rectangle</h4>
            <Input
              ref={nameInputRef}
              placeholder="Name"
              value={rectangles[selectedGridRectangle]?.name || ""}
              onChange={handleNameChange}
              style={{ marginBottom: 8 }}
            />
            <Button
              type="danger"
              onClick={handleDeleteRectangle}
              style={{ backgroundColor: "red", color: "white" }}
            >
              Delete Rectangle
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
