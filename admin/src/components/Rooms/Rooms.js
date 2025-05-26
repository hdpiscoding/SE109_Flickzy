import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Input,
  Space,
  Drawer,
  Select,
  Form,
  message,
} from "antd";
import { PlusOutlined, FilterOutlined } from "@ant-design/icons";
import { deleteRoom, getAllRooms } from "../../services/adminService";

const { Search } = Input;
const { Option } = Select;

const Rooms = () => {
  const [searchText, setSearchText] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await getAllRooms();
        // Nếu API trả về { data: { data: [...] } }
        const data = res.data.data;

        setRooms(data || []);
      } catch (error) {
        setRooms([]);
      }
    };
    fetchRooms();
  }, []);

  const columns = [
    { title: "Room Name", dataIndex: "roomName", key: "roomName" },
    { title: "Room Type", dataIndex: "roomType", key: "roomType" },
    { title: "Width", dataIndex: "width", key: "width" },
    { title: "Height", dataIndex: "height", key: "height" },
    { title: "Cinema ID", dataIndex: "cinemaId", key: "cinemaId" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            danger
            onClick={() => handleDelete(record.roomId)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  const handleDelete = async (roomId) => {
    try {
      await deleteRoom(roomId);
      setRooms((prev) =>
        prev.map((room) =>
          room.roomId === roomId ? { ...room, delete: true } : room
        )
      );
      message.success("Room deleted!");
    } catch (error) {
      message.error("Delete failed!");
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const filteredRooms = rooms
    .filter((room) => room.delete === false) // chỉ lấy room chưa bị xóa
    .filter((room) =>
      room.roomName?.toLowerCase().includes(searchText.toLowerCase())
    );

  return (
    <div>
      <Space
        style={{
          marginBottom: 16,
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Search
          placeholder="Search Room"
          onSearch={handleSearch}
          style={{ width: 200 }}
        />
        <Space>
          {/* <Button
            icon={<FilterOutlined />}
            onClick={() => setFilterVisible(true)}
          >
            Filters
          </Button> */}
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              window.location.href = "/new-room";
            }}
          >
            Add Room
          </Button>
        </Space>
      </Space>
      <Table
        columns={columns}
        dataSource={filteredRooms.map((room, idx) => ({
          ...room,
          key: room.roomId || idx,
        }))}
        pagination={false}
      />

      <Drawer
        title="Filter Rooms"
        placement="right"
        onClose={() => setFilterVisible(false)}
        open={filterVisible}
      >
        <Form layout="vertical">
          <Form.Item label="Room Type">
            <Select>
              <Option value="IMAX">IMAX</Option>
              <Option value="Standard">Standard</Option>
              <Option value="4DX">4DX</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Status">
            <Select>
              <Option value="Available">Available</Option>
              <Option value="Occupied">Occupied</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Seats Capacity">
            <Select>
              <Option value="less_than_100">Less than 100</Option>
              <Option value="100-200">100-200</Option>
              <Option value="more_than_200">More than 200</Option>
            </Select>
          </Form.Item>
          <Button type="primary" block>
            Apply Filters
          </Button>
        </Form>
      </Drawer>
    </div>
  );
};

export default Rooms;
