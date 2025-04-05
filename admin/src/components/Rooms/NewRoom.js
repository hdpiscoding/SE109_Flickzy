import { useState, useEffect, useRef } from "react";
import { Row, Input, Button, Col, message, Select, Form, Drawer } from "antd";
import NewRoom2 from "./NewRoom2";
import { addRoom, getAllSeatTypes } from "../../services/adminService";

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

  const [rowLabelMode, setRowLabelMode] = useState("all"); // "all" hoặc "aToZ"
  const handleOpenDrawer = () => {
    setIsDrawerVisible(true);
  };
  const [all, setAll] = useState("All"); // Tên của ô đầu tiên
  const [columnsToDelete, setColumnsToDelete] = useState(""); // Lưu danh sách các cột cần xóa

  const handleDeleteColumns = () => {
    if (!columnsToDelete.trim()) {
      message.error("Please enter columns to delete.");
      return;
    }

    // Chuyển danh sách cột từ chuỗi thành mảng số
    const columns = columnsToDelete
      .split(",")
      .map((col) => parseInt(col.trim(), 10))
      .filter((col) => !isNaN(col)); // Loại bỏ giá trị không hợp lệ

    if (columns.length === 0) {
      message.error("Invalid column input.");
      return;
    }

    // Lọc các hình chữ nhật không thuộc các cột cần xóa trên các hàng được chọn
    const updatedRectangles = rectangles.filter(
      (rect) =>
        !editRows.includes(rect.row - 1) || // Giữ các hình chữ nhật không thuộc hàng được chọn
        !columns.includes(rect.col) // Giữ các hình chữ nhật không thuộc cột cần xóa
    );

    setRectangles(updatedRectangles); // Cập nhật danh sách hình chữ nhật
    setColumnsToDelete(""); // Reset input
    message.success("Columns deleted successfully.");
  };
  const handleCloseDrawer = () => {
    setIsDrawerVisible(false);
    setNewRectangle({ name: "", width: 1, height: 1, color: "#000000" }); // Reset form
  };
  const handleApplyRowLabel = () => {
    if (editRows.length > 0 && rowLabel.trim() !== "") {
      let updatedRectangles = [...rectangles];

      if (rowLabelMode === "all") {
        // Apply the same label to all selected rows
        updatedRectangles = updatedRectangles.map((rect) => {
          if (editRows.includes(rect.row - 1)) {
            const indexInRow = rectangles
              .filter((r) => r.row === rect.row)
              .sort((a, b) => a.col - b.col)
              .indexOf(rect);
            return { ...rect, name: `${rowLabel} ${indexInRow + 1}` };
          }
          return rect;
        });
      } else if (rowLabelMode === "aToZ") {
        // Apply A->Z logic
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        updatedRectangles = updatedRectangles.map((rect) => {
          const rowIndex = editRows.indexOf(rect.row - 1);
          if (rowIndex !== -1) {
            const labelPrefix =
              alphabet[
                (alphabet.indexOf(rowLabel.toUpperCase()) + rowIndex) %
                  alphabet.length
              ];
            const indexInRow = rectangles
              .filter((r) => r.row === rect.row)
              .sort((a, b) => a.col - b.col)
              .indexOf(rect);
            return { ...rect, name: `${labelPrefix} ${indexInRow + 1}` };
          }
          return rect;
        });
      }

      setRectangles(updatedRectangles);
      setRowLabel(""); // Reset input
    } else {
      message.error("Please select rows and enter a label.");
    }
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

  const [predefinedRectangles, setPredefinedRectangles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSeatTypes = async () => {
      const res = await getAllSeatTypes();
      alert(JSON.stringify(res));

      setPredefinedRectangles(res);
    };

    fetchSeatTypes();
  }, []);

  const [selectedRectangleForRow, setSelectedRectangleForRow] = useState(null); // Trạng thái cho combobox
  const [arrangeRowLabel, setArrangeRowLabel] = useState(""); // State for row label during arrange
  const [editRows, setEditRows] = useState([]);
  const handleRowClick = (rowIndex) => {
    setSelectedGridRectangle(null);
    setSelectedRectangle(null);

    // Nếu hàng đã được chọn, bỏ chọn nó
    if (editRows.includes(rowIndex)) {
      setEditRows(editRows.filter((row) => row !== rowIndex));
    } else {
      // Nếu chưa được chọn, thêm vào danh sách và sắp xếp
      const newEditRows = [...editRows];
      let inserted = false;

      for (let i = 0; i < newEditRows.length; i++) {
        if (rowIndex < newEditRows[i]) {
          newEditRows.splice(i, 0, rowIndex); // Chèn vào đúng vị trí
          inserted = true;
          break;
        }
      }

      if (!inserted) {
        // Nếu không có phần tử nào lớn hơn, thêm vào cuối
        newEditRows.push(rowIndex);
      }

      setEditRows(newEditRows);
    }
  };

  const handleArrangeRow = () => {
    if (editRows.length > 0 && selectedRectangleForRow) {
      const { width, height } = selectedRectangleForRow;

      let updatedRectangles = [...rectangles];

      // Lặp qua tất cả các hàng được chọn
      editRows.forEach((rowIndex) => {
        // Xóa tất cả các hình chữ nhật trong hàng hiện tại
        updatedRectangles = updatedRectangles.filter(
          (rect) => rect.row !== rowIndex + 1
        );

        // Sắp xếp các hình chữ nhật mới theo chiều ngang
        const newRectangles = [];
        let colIndex = 1;

        while (colIndex < column + 2 - width) {
          // Kiểm tra xem có đủ không gian để đặt hình chữ nhật không
          const canPlace = !updatedRectangles.some((rect) => {
            return (
              rect.row >= rowIndex + 1 &&
              rect.row < rowIndex + 1 + height &&
              rect.col >= colIndex &&
              rect.col < colIndex + width
            );
          });

          if (canPlace) {
            // Thêm hình chữ nhật mới với nhãn
            const indexInRow = newRectangles.length + 1;
            newRectangles.push({
              ...selectedRectangleForRow,
              row: rowIndex + 1,
              col: colIndex,
              name: arrangeRowLabel ? `${arrangeRowLabel} ${indexInRow}` : "",
            });
            colIndex += width; // Di chuyển sang phải, chừa không gian cho hình chữ nhật
          } else {
            colIndex++; // Di chuyển sang phải một ô và kiểm tra lại
          }
        }

        // Cập nhật danh sách hình chữ nhật
        updatedRectangles = [...updatedRectangles, ...newRectangles];
      });

      setRectangles(updatedRectangles); // Cập nhật trạng thái hình chữ nhật
      setSelectedRectangleForRow(null); // Reset combobox
      setArrangeRowLabel(""); // Reset nhãn hàng
    } else {
      message.error("Please select rows and a chair type.");
    }
  };

  const handleSubmit = () => {
    const newGrid = Array.from({ length: row }, () =>
      Array.from({ length: column }, () => ({ color: "white" }))
    );
    setGrid(newGrid);
  };

  const [rowLabel, setRowLabel] = useState("");

  // Function to apply row label

  const handleDeleteAllRow = () => {
    if (editRows.length > 0) {
      const updatedRectangles = rectangles.filter(
        (rect) => !editRows.includes(rect.row - 1)
      );
      setRectangles(updatedRectangles);
    }
  };
  // Đặt hình chữ nhật tại vị trí đã chọn

  const placeRectangle = (rowIndex, colIndex) => {
    if (!selectedRectangle) return;

    const { width, height, id } = selectedRectangle;
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
      {
        ...selectedRectangle,
        row: rowIndex,
        col: colIndex + 1,
        name: "",
        type: id,
      }, // Adjust colIndex by adding 1
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
      rowIndex + 1 + height > row + 1 || // No need to adjust rowIndex
      colIndex + 1 + width > column + 1 || // Adjust colIndex by adding 1
      rectangles.some(
        (rect) =>
          rowIndex + 1 < rect.row + rect.height &&
          rowIndex + 1 + height > rect.row &&
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

  const handleRectangleClick = (index) => {
    // Reset editRow when clicking on a rectangle
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
  const [step, setStep] = useState(1);
  const nextStep = async () => {
    setStep(2);
  };
  const handleAll = () => {
    if (all === "All") {
      setAll("Delete");
      setEditRows(Array.from({ length: row }, (_, i) => i));
    } else {
      setAll("All");
      setEditRows([]);
    }
  };
  return step === 1 ? (
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
            <div style={{ display: "flex" }}>
              <div
                onClick={handleAll}
                style={{
                  width: cellSize,
                  height: cellSize,
                  backgroundColor: "#f0f0f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid #000",
                  fontWeight: "bold",
                }}
              >
                {all}
              </div>
              {Array.from({ length: column }).map((_, colIndex) => (
                <div
                  key={`col-${colIndex}`}
                  style={{
                    width: cellSize,
                    height: cellSize,
                    backgroundColor: "#f0f0f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid #000",
                    fontWeight: "bold",
                  }}
                >
                  {colIndex + 1}
                </div>
              ))}
            </div>

            {grid.map((row, rowIndex) => (
              <div key={rowIndex} style={{ display: "flex" }}>
                <div
                  onClick={() => handleRowClick(rowIndex)} // Sử dụng hàm mới
                  style={{
                    width: cellSize,
                    height: cellSize,
                    backgroundColor: editRows.includes(rowIndex)
                      ? "green"
                      : "#f0f0f0", // Đổi màu nếu hàng được chọn
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid #000",
                    cursor: "pointer",
                    color: editRows.includes(rowIndex) ? "white" : "black",
                  }}
                >
                  {rowIndex + 1}
                </div>
                {row.map((cell, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    onMouseEnter={() => setHoveredCell({ rowIndex, colIndex })}
                    onMouseLeave={() => setHoveredCell(null)}
                    onClick={() => placeRectangle(rowIndex + 1, colIndex)}
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
          width: 350,
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
          onClick={nextStep}
        >
          Next Step
        </Button>

        <div
          style={{
            flex: 1,
            overflowY: "auto",

            minHeight: "90vh",
            maxHeight: "90vh",
            marginTop: 16,
          }}
        >
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
                      setNewRectangle({
                        ...newRectangle,
                        name: e.target.value,
                      })
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
                      setNewRectangle({
                        ...newRectangle,
                        color: e.target.value,
                      })
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
              <h3>Edit Seat</h3>
              <div style={{ fontSize: 15 }}>Name</div>

              <Input
                ref={nameInputRef}
                placeholder="Name"
                value={rectangles[selectedGridRectangle]?.name || ""}
                onChange={handleNameChange}
                style={{ marginBottom: 8 }}
              />
              <div>
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
          {editRows.length > 0 && ( // Kiểm tra nếu có ít nhất một hàng được chọn
            <div style={{ marginTop: 16, flexShrink: 0 }}>
              <hr></hr>
              <h3>
                Edit Rows {editRows.map((row) => row + 1).join(", ")}
              </h3>{" "}
              {/* Hiển thị danh sách các hàng được chọn */}
              <div style={{ fontSize: 15 }}>Row Label</div>
              <div style={{ display: "flex", marginTop: 8 }}>
                <Input
                  placeholder="Row Label"
                  value={rowLabel}
                  onChange={(e) => setRowLabel(e.target.value)}
                  style={{ marginBottom: 8, marginRight: 8 }}
                />
                <Select
                  placeholder="Select Mode"
                  value={rowLabelMode}
                  onChange={(value) => setRowLabelMode(value)}
                  style={{ marginBottom: 8, marginRight: 8, width: 120 }}
                >
                  <Select.Option value="all">All</Select.Option>
                  <Select.Option value="aToZ">A-Z</Select.Option>
                </Select>
                <Button type="primary" onClick={handleApplyRowLabel}>
                  Apply
                </Button>
              </div>
              <div style={{ fontSize: 15 }}>Delete Column</div>
              <div style={{ display: "flex", marginTop: 8 }}>
                <Input
                  placeholder="(e.g., 1,2,3)"
                  value={columnsToDelete}
                  onChange={(e) => setColumnsToDelete(e.target.value)}
                  style={{ marginBottom: 8, marginRight: 8 }}
                />
                <Button
                  type="primary"
                  onClick={handleDeleteColumns}
                  style={{ backgroundColor: "red", color: "white" }}
                >
                  Delete Columns
                </Button>
              </div>
              <div style={{ fontSize: 15 }}>Select Seat's Type</div>
              <div style={{ display: "flex", marginTop: 8 }}>
                <Select
                  placeholder="Select Seat's Type"
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
                <Button
                  type="primary"
                  onClick={handleArrangeRow}
                  style={{ marginLeft: 8 }}
                >
                  Arrange Rows
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
                Delete All Rows
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <NewRoom2 rectangles={rectangles} height={row} width={column}>
      {" "}
    </NewRoom2>
  );
}
