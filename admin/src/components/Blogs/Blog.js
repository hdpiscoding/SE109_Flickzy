import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Space, Popconfirm, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import AddBlogsModal from "./AddBlogsModal";
import EditBlogsModal from "./EditBlogsModal";
import "./Blog.scss";
import { getAllBlog, getABlog, deleteABlog } from "../../services/blogService";

const initialBlogs = [
  {
    id: "da1ae2d5-0fae-4134-a9d9-5e85acf788d9",
    title: "Blog Title 7",
    description: "Short description",
    cover: "https://i.ebayimg.com/images/g/VNwAAOSwu3lkuGJI/s-l1200.jpg",
    views: 4,
  },
  {
    id: "a11b4861-8db4-4b72-a330-24c4df1f00f0",
    title: "Blog Title 8",
    description: "Short description",
    cover:
      "https://w0.peakpx.com/wallpaper/48/558/HD-wallpaper-godzilla-landscape-monster-b-movie-posters.jpg",
    views: 3,
  },
];

const Blog = () => {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  // Thêm hàm fetchBlogs để dùng lại
  const fetchBlogs = async () => {
    try {
      const res = await getAllBlog({ limit: 100, page: 1 });
      setBlogs(res.data || []);
    } catch (error) {
      setBlogs([]);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Callback khi add hoặc edit thành công
  const handleSuccess = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(false);
    fetchBlogs();
  };

  const handleDelete = async (id) => {
    try {
      await deleteABlog(id);
      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
      //   message.success("Deleted successfully");
    } catch (error) {
      // message.error("Delete failed");
    }
  };

  const handleEdit = async (record) => {
    try {
      const blogDetail = await getABlog(record.id);
      setEditingBlog(blogDetail.data || blogDetail); // tuỳ backend trả về
      setIsEditModalOpen(true);
    } catch (error) {
      setEditingBlog(null);
      setIsEditModalOpen(false);
    }
  };

  const columns = [
    {
      title: "Ảnh bìa",
      dataIndex: "cover",
      key: "cover",
      render: (url) => <img src={url} alt="cover" className="blog-cover-img" />,
      width: 100,
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      width: 200,
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      width: 300,
    },
    {
      title: "Lượt xem",
      dataIndex: "views",
      key: "views",
      width: 80,
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
            title="Bạn có chắc chắn muốn xóa blog này không?"
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
    <div className="blog-management-page">
      <div className="blog-header">
        <h2>Quản lý blog</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}>
          Thêm blog
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={blogs}
        rowKey="id"
        pagination={{ pageSize: 5 }} // Hiển thị 20 blog mỗi tranghị tất cả blog, không phân trang
        className="blog-table"
      />
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        destroyOnClose
        width={700}>
        <AddBlogsModal onSuccess={handleSuccess} />
      </Modal>
      <Modal
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={null}
        destroyOnClose
        width={700}>
        {editingBlog && (
          <EditBlogsModal blog={editingBlog} onSuccess={handleSuccess} />
        )}
      </Modal>
    </div>
  );
};

export default Blog;
