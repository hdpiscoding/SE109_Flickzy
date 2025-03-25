import React, { useState } from "react";
import { Table, Button, Input, Space, Drawer, Select, Form } from "antd";
import { PlusOutlined, FilterOutlined } from "@ant-design/icons";

const { Search } = Input;
const { Option } = Select;

const Rooms = () => {
  const [searchText, setSearchText] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);
  const [rooms, setRooms] = useState([
    { key: 1, name: "Room A", type: "IMAX", status: "Available", seats: 200 },
    {
      key: 2,
      name: "Room B",
      type: "Standard",
      status: "Occupied",
      seats: 150,
    },
  ]);

  const columns = [
    { title: "Room Name", dataIndex: "name", key: "name" },
    { title: "Type", dataIndex: "type", key: "type" },
    { title: "Seats", dataIndex: "seats", key: "seats" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button type="link">Edit</Button>
          <Button type="link" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(searchText.toLowerCase())
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
          <Button
            icon={<FilterOutlined />}
            onClick={() => setFilterVisible(true)}
          >
            Filters
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              // Navigate to NewRoom component
              window.location.href = "/new-room";
            }}
          >
            Add Room
          </Button>
        </Space>
      </Space>
      <Table columns={columns} dataSource={filteredRooms} />

      <Drawer
        title="Filter Rooms"
        placement="right"
        onClose={() => setFilterVisible(false)}
        visible={filterVisible}
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
