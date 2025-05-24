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
      const res = await getAllBlog({});
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
      title: "Cover",
      dataIndex: "cover",
      key: "cover",
      render: (url) => <img src={url} alt="cover" className="blog-cover-img" />,
      width: 100,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 200,
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 300,
    },
    {
      title: "Views",
      dataIndex: "views",
      key: "views",
      width: 80,
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
            title="Are you sure to delete this blog?"
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
    <div className="blog-management-page">
      <div className="blog-header">
        <h2>Blog Management</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}>
          Add Blog
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={blogs}
        rowKey="id"
        pagination={{ pageSize: 5 }}
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
