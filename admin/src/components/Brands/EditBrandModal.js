import React, { useState, useEffect } from "react";
import { Form, Input, Button, Upload, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./EditBrandModal.scss";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import MarkdownIt from "markdown-it";
import { editABrand } from "../../services/brandService";

const mdParser = new MarkdownIt();

const EditBrandModal = ({ brand, onSuccess }) => {
  const [avatarFile, setAvatarFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [description, setDescription] = useState("");
  const [form] = Form.useForm();

  useEffect(() => {
    if (brand) {
      form.setFieldsValue({
        brandName: brand.brandName,
      });
      setAvatarFile(brand.avatar || null);
      setCoverFile(brand.cover || null);
      setDescription(brand.description || "");
    }
  }, [brand, form]);

  const getBase64 = (file, cb) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => cb(reader.result);
  };

  const handleAvatarChange = (info) => {
    if (info.file.status === "removed") {
      setAvatarFile(null);
      return;
    }
    const file = info.file.originFileObj;
    if (file && file instanceof Blob) {
      getBase64(file, (imageUrl) => setAvatarFile(imageUrl));
    } else {
      setAvatarFile(null);
    }
  };

  const handleCoverChange = (info) => {
    if (info.file.status === "removed") {
      setCoverFile(null);
      return;
    }
    const file = info.file.originFileObj;
    if (file && file instanceof Blob) {
      getBase64(file, (imageUrl) => setCoverFile(imageUrl));
    } else {
      setCoverFile(null);
    }
  };

  const onFinish = async (values) => {
    const brandData = {
      brandName: values.brandName,
      avatar: avatarFile,
      cover: coverFile,
      description: description,
    };
    try {
      await editABrand(brand.id, brandData);
      if (onSuccess) onSuccess();
    } catch (error) {
      // handle error
    }
  };

  return (
    <div className="brand-form-container">
      <h1>Edit Brand</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="brand-form">
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              label="Brand Name"
              name="brandName"
              rules={[
                { required: true, message: "Please input the brand name!" },
              ]}>
              <Input placeholder="Brand Name" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Avatar"
              required
              rules={[{ required: true, message: "Please upload an avatar!" }]}>
              <Upload
                accept="image/*"
                listType="picture"
                maxCount={1}
                beforeUpload={() => false}
                onChange={handleAvatarChange}
                onRemove={() => setAvatarFile(null)}>
                <Button icon={<UploadOutlined />}>Select Avatar</Button>
              </Upload>
              {avatarFile && (
                <img
                  src={avatarFile}
                  alt="avatar preview"
                  style={{
                    marginTop: 12,
                    maxHeight: 100,
                    borderRadius: 8,
                  }}
                />
              )}
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Cover"
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
                <Button icon={<UploadOutlined />}>Select Cover</Button>
              </Upload>
              {coverFile && (
                <img
                  src={coverFile}
                  alt="cover preview"
                  style={{
                    marginTop: 12,
                    maxHeight: 100,
                    borderRadius: 8,
                  }}
                />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <div className="md-editor-block">
              <label className="ant-form-item-label">
                <span>Description</span>
              </label>
              <MdEditor
                value={description}
                style={{ height: "200px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={({ text }) => setDescription(text)}
                className="brand-md-editor"
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

export default EditBrandModal;
