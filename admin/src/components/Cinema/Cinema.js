import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Space, Popconfirm, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import AddCinemaModal from "./AddCinemaModal";
import EditCinemaModal from "./EditCinemaModal";
import "./Cinema.scss";
import {
  getAllCinema,
  getACinema,
  deleteACinema,
} from "../../services/cinemaService";

const CinemaAndBrand = () => {
  const [cinemas, setCinemas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCinema, setEditingCinema] = useState(null);

  const fetchCinemas = async () => {
    try {
      const res = await getAllCinema();
      setCinemas(res.data || []);
    } catch (error) {
      setCinemas([]);
    }
  };

  useEffect(() => {
    fetchCinemas();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteACinema(id);
      setCinemas((prev) => prev.filter((cinema) => cinema.id !== id));
    } catch (error) {
      // handle error
    }
  };

  const handleEdit = async (record) => {
    try {
      const cinemaDetail = await getACinema(record.id);
      setEditingCinema(cinemaDetail.data || cinemaDetail);
      setIsEditModalOpen(true);
    } catch (error) {
      setEditingCinema(null);
      setIsEditModalOpen(false);
    }
  };

  const columns = [
    {
      title: "Tên rạp phim",
      dataIndex: "cinemaName",
      key: "cinemaName",
      width: 180,
      sorter: (a, b) => a.cinemaName.localeCompare(b.cinemaName),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "ID thương hiệu",
      dataIndex: "brandId",
      key: "brandId",
      width: 180,
      ellipsis: true,
    },
    {
      title: "Địa chỉ",
      dataIndex: "cinemaAddress",
      key: "cinemaAddress",
      width: 220,
      ellipsis: true,
    },
    {
      title: "Tỉnh/Thành phố",
      dataIndex: "province",
      key: "province",
      width: 120,
    },
    {
      title: "Thao tác",
      key: "action",
      width: 120,
      render: (_, record) => (
        <Space>
          <Tooltip title="Chỉnh sửa">
            <Button
              icon={<EditOutlined />}
              size="small"
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa rạp phim này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Có"
            cancelText="Không">
            <Tooltip title="Xóa">
              <Button icon={<DeleteOutlined />} size="small" danger />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="cinema-management-page">
      <div className="cinema-header">
        <h2>Quản lý rạp phim</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}>
          Thêm rạp phim
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={cinemas}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        className="cinema-table"
      />
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        destroyOnClose
        width={700}>
        <AddCinemaModal
          onSuccess={() => {
            setIsModalOpen(false);
            fetchCinemas();
          }}
        />
      </Modal>
      <Modal
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={null}
        destroyOnClose
        width={700}>
        {editingCinema && (
          <EditCinemaModal
            cinema={editingCinema}
            onSuccess={() => {
              setIsEditModalOpen(false);
              fetchCinemas();
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default CinemaAndBrand;
