import React, { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  Upload,
  Row,
  Col,
} from "antd";
import { toast } from "react-toastify";

import { UploadOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import "./AddBlogsModal.scss";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import MarkdownIt from "markdown-it";
import { addABlog } from "../../services/blogService";
import { uploadToCloudinary } from "../../untils/uploadToCloudinary";

const { Option } = Select;

const categories = [
  { id: "550e8400-e29b-41d4-a716-446655440000", name: "Theatrical Movie" },
  { id: "a4b52c20-6d4b-42d1-9a6f-51c9d3f4e2bd", name: "Movie Collection" },
  { id: "c183e72d-e684-4936-a1d9-5c84e3f9b41a", name: "Movie Review" },
  { id: "e3a05d6f-d59c-4b85-87dc-0167d4fc0f6b", name: "Latest" },
];

const mdParser = new MarkdownIt();

const AddBlogsModal = ({ onSuccess }) => {
  const [content, setContent] = useState("");
  const [coverFile, setCoverFile] = useState(null);
  const [form] = Form.useForm();
  const [uploading, setUploading] = useState(false);

  const handleCoverChange = (info) => {
    if (info.fileList.length === 0) {
      setCoverFile(null);
      return;
    }
    const file = info.fileList[0]?.originFileObj;
    if (file && file instanceof Blob) {
      setCoverFile(file);
    } else {
      setCoverFile(null);
    }
  };

  const onFinish = async (values) => {
    setUploading(true);
    try {
      let coverUrl = coverFile;
      if (coverFile && typeof coverFile !== "string") {
        coverUrl = await uploadToCloudinary(coverFile);
      }
      if (!coverUrl) {
        setUploading(false);
        return;
      }
      const blogData = {
        title: values.title,
        content: content,
        description: values.description,
        cover: coverUrl,
        timeToRead: values.timeToRead,
        categoryId: values.categoryId,
      };
      await addABlog(blogData);
      if (onSuccess) onSuccess();

      toast.success("Create blog successfully!");
    } catch (error) {
      toast.error("Failed to create blog!");
    }
    setUploading(false);
  };

  const coverImg = coverFile
    ? typeof coverFile === "string"
      ? coverFile
      : URL.createObjectURL(coverFile)
    : null;

  return (
    <div className="blog-form-container">
      <h1>Create New Blog</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="blog-form"
        initialValues={{
          timeToRead: 5,
          categoryId: categories[0].id,
        }}>
        <Row gutter={24}>
          <Col xs={24} md={16}>
            <Form.Item
              label="Title"
              name="title"
              rules={[
                { required: true, message: "Please input the blog title!" },
              ]}>
              <Input placeholder="Blog Title" />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              label="Time To Read (minutes)"
              name="timeToRead"
              rules={[
                { required: true, message: "Please input time to read!" },
              ]}>
              <InputNumber min={1} max={60} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please input the description!" },
              ]}>
              <Input placeholder="Short description" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              label="Cover Image"
              required
              rules={[
                { required: true, message: "Please upload a cover image!" },
              ]}>
              <Upload
                accept="image/*"
                listType="picture"
                maxCount={1}
                beforeUpload={() => false}
                onChange={handleCoverChange}
                onRemove={() => setCoverFile(null)}
                showUploadList={false}
                disabled={uploading}>
                <Button icon={<UploadOutlined />}>Select Image</Button>
              </Upload>
              {coverImg && (
                <img
                  src={coverImg}
                  alt="cover preview"
                  style={{
                    marginTop: 12,
                    maxHeight: 180,
                    borderRadius: 8,
                  }}
                />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              label="Category"
              name="categoryId"
              rules={[
                { required: true, message: "Please select a category!" },
              ]}>
              <Select>
                {categories.map((cat) => (
                  <Option key={cat.id} value={cat.id}>
                    {cat.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <div className="md-editor-block">
              <label className="ant-form-item-label">
                <span>Content</span>
              </label>
              <MdEditor
                value={content}
                style={{ height: "300px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={({ text }) => setContent(text)}
                className="blog-md-editor"
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Create Blog
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AddBlogsModal;
