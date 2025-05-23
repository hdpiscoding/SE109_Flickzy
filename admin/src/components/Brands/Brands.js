import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Space, Popconfirm, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import AddBrandModal from "./AddBrandModal";
import EditBrandModal from "./EditBrandModal";
import "./Brands.scss";
import {
  getAllBrand,
  getABrand,
  deleteABrand,
} from "../../services/brandService";

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);

  const fetchBrands = async () => {
    try {
      const res = await getAllBrand();
      setBrands(res.data || []);
    } catch (error) {
      setBrands([]);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteABrand(id);
      setBrands((prev) => prev.filter((brand) => brand.id !== id));
    } catch (error) {
      // handle error
    }
  };

  const handleEdit = async (record) => {
    try {
      const brandDetail = await getABrand(record.id);
      setEditingBrand(brandDetail.data || brandDetail);
      setIsEditModalOpen(true);
    } catch (error) {
      setEditingBrand(null);
      setIsEditModalOpen(false);
    }
  };

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (url) => (
        <img src={url} alt="avatar" className="brand-avatar-img" />
      ),
      width: 80,
    },
    {
      title: "Brand Name",
      dataIndex: "brandName",
      key: "brandName",
      width: 180,
      sorter: (a, b) => a.brandName.localeCompare(b.brandName),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Cover",
      dataIndex: "cover",
      key: "cover",
      render: (url) => (
        <img src={url} alt="cover" className="brand-cover-img" />
      ),
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
            title="Are you sure to delete this brand?"
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
    <div className="brand-management-page">
      <div className="brand-header">
        <h2>Brand Management</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}>
          Add Brand
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={brands}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        className="brand-table"
      />
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        destroyOnClose
        width={700}>
        <AddBrandModal
          onSuccess={() => {
            setIsModalOpen(false);
            fetchBrands();
          }}
        />
      </Modal>
      <Modal
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={null}
        destroyOnClose
        width={700}>
        {editingBrand && (
          <EditBrandModal
            brand={editingBrand}
            onSuccess={() => {
              setIsEditModalOpen(false);
              fetchBrands();
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default Brands;
