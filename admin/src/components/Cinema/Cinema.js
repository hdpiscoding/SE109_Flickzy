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
      title: "Cinema Name",
      dataIndex: "cinemaName",
      key: "cinemaName",
      width: 180,
      sorter: (a, b) => a.cinemaName.localeCompare(b.cinemaName),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Brand ID",
      dataIndex: "brandId",
      key: "brandId",
      width: 180,
      ellipsis: true,
    },
    {
      title: "Address",
      dataIndex: "cinemaAddress",
      key: "cinemaAddress",
      width: 220,
      ellipsis: true,
    },
    {
      title: "Province",
      dataIndex: "province",
      key: "province",
      width: 120,
    },
    {
      title: "Action",
      key: "action",
      width: 120,
      render: (_, record) => (
        <Space>
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              size="small"
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Are you sure to delete this cinema?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No">
            <Tooltip title="Delete">
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
        <h2>Cinema Management</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}>
          Add Cinema
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
