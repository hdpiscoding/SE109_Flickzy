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
import { UploadOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import "./EditBlogsModal.scss";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import MarkdownIt from "markdown-it";

const { Option } = Select;

const dummyCategories = [
  { id: "a4b52c20-6d4b-42d1-9a6f-51c9d3f4e2bd", name: "Tech" },
  { id: "b1c23d45-7e8f-4a1b-9c2d-12e3f4g5h6i7", name: "Life" },
];

const mdParser = new MarkdownIt();

const EditBlogsModal = () => {
  const [content, setContent] = useState("");
  const [coverFile, setCoverFile] = useState(null);

  const getBase64 = (file, cb) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => cb(reader.result);
  };

  const handleCoverChange = (info) => {
    if (info.file.status === "removed") {
      setCoverFile(null);
      return;
    }
    const file = info.file.originFileObj;
    if (file && file instanceof Blob) {
      getBase64(file, (imageUrl) => {
        setCoverFile(imageUrl);
      });
    } else {
      setCoverFile(null);
    }
  };

  const [form] = Form.useForm();

  const onFinish = (values) => {
    const blogData = { ...values, content, cover: coverFile };
    // handle submit logic here
    console.log(blogData);
  };

  return (
    <div className="blog-form-container">
      <h1>Edit New Blog</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="blog-form"
        initialValues={{
          timeToRead: 5,
          categoryId: dummyCategories[0].id,
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
                onRemove={() => setCoverFile(null)}>
                <Button icon={<UploadOutlined />}>Select Image</Button>
              </Upload>
              {coverFile && (
                <img
                  src={coverFile}
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
                {dummyCategories.map((cat) => (
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
                Save Change
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default EditBlogsModal;
