import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Input,
  Popconfirm,
  Form,
  Row,
  Col,
  Select,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  addSchedule,
  deleteSchedule,
  getAllSchedule,
  getAllRooms,
} from "../../services/adminService";
import { getAllCinema } from "../../services/cinemaService";
import { getAllMovies } from "../../services/adminService";
// Bạn cần tạo file này nếu chưa có

const SCHEDULE_TYPES = [
  { id: "20c3c8c8-7abb-45ca-b11c-5013e4d578c9", name: "IMAX phụ đề" },
  { id: "3cf6eebf-91bb-4da3-ade2-6a5e0d3bcc3b", name: "IMAX thuyết minh" },
  { id: "96ce4408-5ff8-4b0c-ab76-9fc673e8a217", name: "2D Thuyết minh" },
  { id: "cb070f15-d195-4f87-97b7-478cf0610c73", name: "3D phụ đề" },
  { id: "d551e6b8-b5dc-4ac3-9e99-fe27e5a608f0", name: "3D thuyết minh" },
  { id: "dc2e1b68-f933-4304-ae0c-ab0f0891de4b", name: "2D phụ đề" },
];

const Schedules = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [rooms, setRooms] = useState([]);
  const [movies, setMovies] = useState([]);
  const [cinemas, setCinemas] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });

  useEffect(() => {
    // Fetch schedules
    const fetchData = async () => {
      const res = await getAllSchedule();
      setData(res.data);
    };
    fetchData();

    // Fetch rooms
    const fetchRooms = async () => {
      const res = await getAllRooms();
      setRooms(res.data?.data || []);
    };
    fetchRooms();

    // Fetch cinemas
    const fetchCinemas = async () => {
      const res = await getAllCinema();
      setCinemas(res.data?.data || []);
    };
    fetchCinemas();

    // Fetch movies (isShowing only)
    const fetchMovies = async () => {
      const res = await getAllMovies({ limit: 100, isShowing: true });
      setMovies(res.data || []);
    };
    fetchMovies();
  }, []);

  // Filtered data
  const filteredData = data.filter(
    (item) =>
      item.scheduleId.toLowerCase().includes(search.toLowerCase()) ||
      item.movieId.toLowerCase().includes(search.toLowerCase()) ||
      item.roomId.toLowerCase().includes(search.toLowerCase())
  );

  // Table columns
  const columns = [
    {
      title: "Schedule ID",
      dataIndex: "scheduleId",
      key: "scheduleId",
      ellipsis: true,
      width: 180,
    },
    {
      title: "Movie",
      dataIndex: "movieId",
      key: "movieId",
      ellipsis: true,
      width: 220,
      render: (movieId) => {
        const movie = movies.find((m) => m.id === movieId);
        return movie ? `${movie.movieName} (${movieId})` : movieId;
      },
    },
    {
      title: "Room",
      dataIndex: "roomId",
      key: "roomId",
      ellipsis: true,
      width: 220,
      render: (roomId) => {
        const room = rooms.find((r) => r.roomId === roomId);
        return room ? `${room.roomName} (${roomId})` : roomId;
      },
    },
    {
      title: "Date",
      dataIndex: "scheduleDate",
      key: "scheduleDate",
      width: 110,
    },
    {
      title: "Start",
      dataIndex: "scheduleStart",
      key: "scheduleStart",
      width: 90,
    },
    {
      title: "End",
      dataIndex: "scheduleEnd",
      key: "scheduleEnd",
      width: 90,
    },
    {
      title: "Type",
      dataIndex: "typeId",
      key: "typeId",
      ellipsis: true,
      width: 180,
      render: (typeId) => {
        const type = SCHEDULE_TYPES.find((t) => t.id === typeId);
        return type ? `${type.name} (${typeId})` : typeId;
      },
    },
    {
      title: "Action",
      key: "action",
      width: 90,
      render: (_, record) => (
        <Popconfirm
          title="Bạn có chắc muốn xóa lịch chiếu này?"
          onConfirm={() => handleDelete(record.scheduleId)}
          okText="Xóa"
          cancelText="Hủy"
        >
          <Button type="link" danger icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];

  // Delete handler
  const handleDelete = async (id) => {
    await deleteSchedule(id);
    setData((prev) => prev.filter((item) => item.scheduleId !== id));
  };

  // Add handler
  const handleAdd = async (values) => {
    try {
      const res = await addSchedule(
        values.movieId,
        values.roomId,
        values.scheduleDate,
        values.scheduleStart,
        values.scheduleEnd,
        values.typeId
      );
      setData((prev) => [
        res.data?.data
          ? res.data.data
          : {
              ...values,
              scheduleId: Math.random().toString(36).substring(2, 12),
            },
        ...prev,
      ]);
      setOpen(false);
      form.resetFields();
    } catch (error) {
      console.error("Lỗi khi thêm lịch chiếu:", error);
    }
  };

  // Pagination handler
  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  return (
    <div>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Input
            placeholder="Tìm kiếm theo Schedule ID, Movie ID, Room ID"
            prefix={<SearchOutlined />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 320 }}
            allowClear
          />
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setOpen(true)}
          >
            Thêm lịch chiếu
          </Button>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="scheduleId"
        pagination={{
          ...pagination,
          total: filteredData.length,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20"],
        }}
        onChange={handleTableChange}
        scroll={{ x: 900 }}
      />

      <Modal
        title="Thêm lịch chiếu"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => {
          form
            .validateFields()
            .then(handleAdd)
            .catch(() => {});
        }}
        okText="Thêm"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Movie"
            name="movieId"
            rules={[{ required: true, message: "Chọn phim" }]}
          >
            <Select
              showSearch
              placeholder="Chọn phim"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {movies.map((movie) => (
                <Select.Option key={movie.id} value={movie.id}>
                  {movie.movieName} ({movie.id})
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Room"
            name="roomId"
            rules={[{ required: true, message: "Chọn phòng chiếu" }]}
          >
            <Select
              showSearch
              placeholder="Chọn phòng chiếu"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {rooms.map((room) => (
                <Select.Option key={room.roomId} value={room.roomId}>
                  {room.roomName} ({room.roomId})
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Ngày chiếu"
            name="scheduleDate"
            rules={[{ required: true, message: "Nhập ngày chiếu" }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            label="Giờ bắt đầu"
            name="scheduleStart"
            rules={[{ required: true, message: "Nhập giờ bắt đầu" }]}
          >
            <Input type="time" />
          </Form.Item>
          <Form.Item
            label="Giờ kết thúc"
            name="scheduleEnd"
            dependencies={["scheduleStart"]}
            rules={[
              { required: true, message: "Nhập giờ kết thúc" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const start = getFieldValue("scheduleStart");
                  if (!start || !value) return Promise.resolve();
                  if (value > start) return Promise.resolve();
                  return Promise.reject("Giờ kết thúc phải sau giờ bắt đầu");
                },
              }),
            ]}
          >
            <Input type="time" />
          </Form.Item>
          <Form.Item
            label="Loại lịch chiếu"
            name="typeId"
            rules={[{ required: true, message: "Chọn loại lịch chiếu" }]}
          >
            <Select
              showSearch
              placeholder="Chọn loại lịch chiếu"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {SCHEDULE_TYPES.map((type) => (
                <Select.Option key={type.id} value={type.id}>
                  {type.name} ({type.id})
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Schedules;
