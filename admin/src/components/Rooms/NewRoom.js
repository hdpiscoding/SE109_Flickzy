import { useState, useEffect, useRef } from "react";
import { Row, Input, Button, Col, message, Select, Form, Drawer } from "antd";

export default function RectangleGrid() {
  const [column, setColumn] = useState(0);
  const [row, setRow] = useState(0);
  const [grid, setGrid] = useState([]);
  const [selectedRectangle, setSelectedRectangle] = useState(null);
  const [rectangles, setRectangles] = useState([]);
  const [hoveredCell, setHoveredCell] = useState(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [newRectangle, setNewRectangle] = useState({
    name: "",
    width: 1,
    height: 1,
    color: "#000000",
  });

  const handleOpenDrawer = () => {
    setIsDrawerVisible(true);
  };
  const handleRightShift = () => {
    try {
      if (selectedGridRectangle !== null) {
        const updatedRectangles = rectangles
          .map((rect, index) => {
            if (
              rect.row === rectangles[selectedGridRectangle].row &&
              index >= selectedGridRectangle
            ) {
              const newCol = rect.col + 1;
              if (newCol + rect.width > column + 1) {
                return null; // Remove rectangle if it goes out of bounds
              }
              return { ...rect, col: newCol };
            }
            return rect;
          })
          .filter(Boolean); // Remove null values (rectangles that went out of bounds)

        setRectangles(updatedRectangles);

        // Check if the selected rectangle still exists
        if (!updatedRectangles[selectedGridRectangle]) {
          setSelectedGridRectangle(null); // Reset selection if the rectangle no longer exists
        }
      } else {
        setSelectedGridRectangle(null); // Reset editRow when no rectangle is selected
      }
    } catch (error) {
      alert("Please select a rectangle to shift right.");
      setSelectedGridRectangle(null); // Reset editRow when clicking on a rectangle
    }
  };

  const handleCloseDrawer = () => {
    setIsDrawerVisible(false);
    setNewRectangle({ name: "", width: 1, height: 1, color: "#000000" }); // Reset form
  };

  const handleCreateChairType = () => {
    if (!newRectangle.name || newRectangle.width <= 0 || !newRectangle.color) {
      alert("Please fill in all fields correctly.");
      return;
    }
    // Add the new chair type to predefinedRectangles (assuming you have this state)
    setPredefinedRectangles((prev) => [...prev, newRectangle]);
    message.success("New chair type created successfully!");
    handleCloseDrawer();
  };
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
    { name: "Ghế thường", width: 1, height: 1, color: "rgb(68, 68, 68)" },
    { name: "Ghế Vip", width: 1, height: 1, color: "rgb(227, 182, 0)" },
    { name: "Ghế Couple", width: 2, height: 1, color: "rgb(253, 138, 255)" },
  ]);
  const [selectedRectangleForRow, setSelectedRectangleForRow] = useState(null); // Trạng thái cho combobox
  const [arrangeRowLabel, setArrangeRowLabel] = useState(""); // State for row label during arrange

  const handleArrangeRow = () => {
    if (editRow !== null && selectedRectangleForRow) {
      const { width, height } = selectedRectangleForRow;

      if (!arrangeRowLabel.trim()) {
      }

      // Remove all rectangles in the current row
      const updatedRectangles = rectangles.filter(
        (rect) => rect.row !== editRow
      );

      // Arrange new rectangles horizontally
      const newRectangles = [];
      let colIndex = 1;

      while (colIndex < column + 2 - width) {
        // Check if there is enough space to place the rectangle
        const canPlace = !updatedRectangles.some((rect) => {
          return (
            rect.row >= editRow &&
            rect.row < editRow + height &&
            rect.col >= colIndex &&
            rect.col < colIndex + width
          );
        });

        if (canPlace) {
          // Add new rectangle with label
          const indexInRow = newRectangles.length + 1;
          newRectangles.push({
            ...selectedRectangleForRow,
            row: editRow,
            col: colIndex,
            name: arrangeRowLabel ? `${arrangeRowLabel} ${indexInRow}` : "",
          });
          colIndex += width; // Move right, leaving space for the rectangle
        } else {
          colIndex++; // Move right by one cell and check again
        }
      }

      // Update the list of rectangles
      setRectangles([...updatedRectangles, ...newRectangles]);
      setSelectedRectangleForRow(null); // Reset combobox
      setArrangeRowLabel(""); // Reset row label input
    }
  };

  const handleSubmit = () => {
    const newGrid = Array.from({ length: row }, () =>
      Array.from({ length: column }, () => ({ color: "white" }))
    );
    setGrid(newGrid);
  };

  const [editRow, setEditRow] = useState(null);
  const [rowLabel, setRowLabel] = useState("");

  // Function to apply row label
  const handleApplyRowLabel = () => {
    if (editRow !== null && rowLabel.trim() !== "") {
      const updatedRectangles = rectangles.map((rect) => {
        if (rect.row === editRow) {
          const indexInRow = rectangles
            .filter((r) => r.row === editRow)
            .sort((a, b) => a.col - b.col)
            .indexOf(rect);
          return { ...rect, name: `${rowLabel} ${indexInRow + 1}` };
        }
        return rect;
      });
      setRectangles(updatedRectangles);

      setRowLabel("");
    }
  };
  const handleDeleteAllRow = () => {
    if (editRow !== null) {
      // Lọc bỏ tất cả các hình chữ nhật thuộc hàng được chọn
      const updatedRectangles = rectangles.filter(
        (rect) => rect.row !== editRow
      );
      setRectangles(updatedRectangles);
      setEditRow(null); // Đặt lại trạng thái editRow
    }
  };
  // Đặt hình chữ nhật tại vị trí đã chọn

  const placeRectangle = (rowIndex, colIndex) => {
    if (!selectedRectangle) return;

    const { width, height } = selectedRectangle;
    if (
      rowIndex + height > row || // No need to adjust rowIndex
      colIndex + 1 + width > column + 1 || // Adjust colIndex by adding 1
      rectangles.some(
        (rect) =>
          rowIndex < rect.row + rect.height &&
          rowIndex + height > rect.row &&
          colIndex + 1 < rect.col + rect.width && // Adjust colIndex by adding 1
          colIndex + 1 + width > rect.col // Adjust colIndex by adding 1
      )
    ) {
      return;
    }

    const newRectangles = [
      ...rectangles,
      { ...selectedRectangle, row: rowIndex, col: colIndex + 1, name: "" }, // Adjust colIndex by adding 1
    ];
    setRectangles(newRectangles);
    setSelectedGridRectangle(newRectangles.length - 1); // Select the last added rectangle\
    setTimeout(() => {
      if (nameInputRef.current) {
        nameInputRef.current.focus();
      }
    }, 0);
  };
  // Kiểm tra có thể đặt hình chữ nhật tại vị trí đã chọn hay không
  const canPlaceRectangle = (rowIndex, colIndex) => {
    if (!selectedRectangle) return false;

    const { width, height } = selectedRectangle;
    if (
      rowIndex + height > row || // No need to adjust rowIndex
      colIndex + 1 + width > column + 1 || // Adjust colIndex by adding 1
      rectangles.some(
        (rect) =>
          rowIndex < rect.row + rect.height &&
          rowIndex + height > rect.row &&
          colIndex + 1 < rect.col + rect.width && // Adjust colIndex by adding 1
          colIndex + 1 + width > rect.col // Adjust colIndex by adding 1
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
    setEditRow(null); // Reset editRow when clicking on a rectangle
    setSelectedGridRectangle(index);
    setTimeout(() => {
      if (nameInputRef.current) {
        nameInputRef.current.focus();
      }
    }, 0);
  };

  const handleDeleteRectangle = () => {
    setEditRow(null);
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
                {/* Add a clickable cell before each row */}
                <div
                  onClick={() => {
                    setEditRow(rowIndex);
                    setSelectedGridRectangle(null);
                    setSelectedRectangle(null);
                  }}
                  style={{
                    width: cellSize,
                    height: cellSize,
                    backgroundColor: editRow === rowIndex ? "green" : "#f0f0f0", // Change background color if row is being edited
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid #000",
                    cursor: "pointer",
                    color: editRow === rowIndex ? "white" : "black",
                  }}
                >
                  {rowIndex + 1}
                </div>
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
          width: 250,
          padding: 16,
          borderLeft: "1px solid #ccc",
          display: "flex",
          height: "100%",
          flexDirection: "column",
        }}
      >
        <Button
          style={{
            minHeight: 40,
            backgroundColor: "#6aa84f",
            color: "white",
            fontWeight: "bold",
            borderRadius: 10,
            width: "100%",
          }}
        >
          Next Step
        </Button>
        <h3>Select Rectangle</h3>
        <>
          <Button onClick={handleOpenDrawer}>Create new Chair's Type</Button>
          <Drawer
            title="Create New Chair's Type"
            placement="right"
            onClose={handleCloseDrawer}
            visible={isDrawerVisible}
            width={300}
          >
            <Form layout="vertical">
              <Form.Item
                label="Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter the chair type name!",
                  },
                ]}
              >
                <Input
                  value={newRectangle.name}
                  onChange={(e) =>
                    setNewRectangle({ ...newRectangle, name: e.target.value })
                  }
                  placeholder="Enter chair type name"
                />
              </Form.Item>
              <Form.Item label="Width">
                <Input
                  type="number"
                  value={newRectangle.width}
                  onChange={(e) =>
                    setNewRectangle({
                      ...newRectangle,
                      width: Number(e.target.value),
                    })
                  }
                  placeholder="Enter width"
                />
              </Form.Item>

              <Form.Item label="Color">
                <Input
                  type="color"
                  value={newRectangle.color}
                  onChange={(e) =>
                    setNewRectangle({ ...newRectangle, color: e.target.value })
                  }
                />
              </Form.Item>
              <Button type="primary" onClick={handleCreateChairType}>
                Create
              </Button>
            </Form>
          </Drawer>
        </>

        <div
          style={{
            flex: 1,
            overflowY: "auto",

            minHeight: "200px",
            marginTop: 16,
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
                onClick={() => {
                  setEditRow(null);
                  setSelectedGridRectangle(null);
                  setSelectedRectangle(rect);
                }}
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

        {selectedGridRectangle !== null && (
          <div
            style={{
              marginTop: 16,
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <hr></hr>
            <h3>Edit Chair</h3>

            <Input
              ref={nameInputRef}
              placeholder="Name"
              value={rectangles[selectedGridRectangle]?.name || ""}
              onChange={handleNameChange}
              style={{ marginBottom: 8 }}
            />
            <div>
              <Button onClick={handleRightShift}>Right Shift </Button>
              <Button
                type="danger"
                onClick={handleDeleteRectangle}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  marginTop: 8,
                  marginLeft: 8,
                }}
              >
                Delete Chair
              </Button>
            </div>
          </div>
        )}
        {editRow !== null && (
          <div style={{ marginTop: 16, flexShrink: 0 }}>
            <hr></hr>
            <h3>Edit Row {editRow + 1}</h3>
            <div>Reset Row Label</div>
            <div style={{ display: "flex", marginTop: 8 }}>
              {" "}
              <Input
                placeholder="Row Label"
                value={rowLabel}
                onChange={(e) => setRowLabel(e.target.value)}
                style={{ marginBottom: 8, marginRight: 8 }}
              />
              <Button type="primary" onClick={handleApplyRowLabel}>
                Apply
              </Button>
            </div>

            <Button
              type="primary"
              onClick={handleDeleteAllRow}
              style={{
                backgroundColor: "red",
                marginTop: 8,

                color: "white",
              }}
            >
              Delete All Row
            </Button>
            <hr></hr>
            <h3>Arrange Row</h3>
            <div style={{ marginBottom: 8 }}>Row Label</div>
            <Input
              placeholder="Row Label for Arrange"
              value={arrangeRowLabel}
              onChange={(e) => setArrangeRowLabel(e.target.value)}
              style={{ marginBottom: 8 }}
            />
            <div style={{ marginBottom: 8 }}>Chair's Type</div>
            <Select
              placeholder="Select Chair's Type"
              value={selectedRectangleForRow?.name || null}
              onChange={(value) =>
                setSelectedRectangleForRow(
                  predefinedRectangles.find((rect) => rect.name === value)
                )
              }
              style={{ width: "100%", marginBottom: 8 }}
            >
              {predefinedRectangles.map((rect) => (
                <Select.Option key={rect.name} value={rect.name}>
                  {rect.name} (W: {rect.width}, H: {rect.height})
                </Select.Option>
              ))}
            </Select>
            <Button type="primary" onClick={handleArrangeRow}>
              Arrange Row
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
