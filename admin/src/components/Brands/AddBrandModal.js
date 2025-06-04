import React, { useState } from "react";
import { Form, Input, Button, Upload, Row, Col, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./AddBrandModal.scss";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import MarkdownIt from "markdown-it";
import { addABrand } from "../../services/brandService";
import { uploadToCloudinary } from "../../untils/uploadToCloudinary";
const mdParser = new MarkdownIt();

const AddBrandModal = ({ onSuccess }) => {
  const [avatarFile, setAvatarFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [description, setDescription] = useState("");
  const [intro, setIntro] = useState(""); // Thêm state cho intro
  const [form] = Form.useForm();
  const [uploading, setUploading] = useState(false);

  // Chỉ lưu file vào state, không upload ngay
  const handleAvatarChange = (info) => {
    if (info.fileList.length === 0) {
      setAvatarFile(null);
      return;
    }
    const file = info.fileList[0]?.originFileObj;
    if (file && file instanceof Blob) {
      setAvatarFile(file);
    } else {
      setAvatarFile(null);
    }
  };

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
      let avatarUrl = avatarFile;
      let coverUrl = coverFile;

      // Nếu là file object thì upload lên Cloudinary, nếu là string (URL) thì giữ nguyên
      if (avatarFile && typeof avatarFile !== "string") {
        avatarUrl = await uploadToCloudinary(avatarFile);
      }
      if (coverFile && typeof coverFile !== "string") {
        coverUrl = await uploadToCloudinary(coverFile);
      }

      if (!avatarUrl || !coverUrl) {
        message.error("Please upload both avatar and cover!");
        setUploading(false);
        return;
      }

      const brandData = {
        brandName: values.brandName,
        avatar: avatarUrl,
        cover: coverUrl,
        intro: intro, // Thêm intro vào dữ liệu gửi lên
        description: description,
      };
      await addABrand(brandData);
      if (onSuccess) onSuccess();
    } catch (error) {
      // handle error
    }
    setUploading(false);
  };

  // Preview: nếu là URL thì dùng luôn, nếu là file thì dùng URL.createObjectURL
  const avatarImg = avatarFile
    ? typeof avatarFile === "string"
      ? avatarFile.startsWith("http")
        ? avatarFile
        : null
      : URL.createObjectURL(avatarFile)
    : null;
  const coverImg = coverFile
    ? typeof coverFile === "string"
      ? coverFile.startsWith("http")
        ? coverFile
        : null
      : URL.createObjectURL(coverFile)
    : null;

  return (
    <div className="brand-form-container">
      <h1>Create New Brand</h1>
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
        {/* Thêm trường Intro phía trên Description */}
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              label="Intro"
              name="intro"
              rules={[{ required: true, message: "Please input the intro!" }]}>
              <Input
                placeholder="Short introduction"
                value={intro}
                onChange={(e) => setIntro(e.target.value)}
              />
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
                onRemove={() => setAvatarFile(null)}
                showUploadList={false}
                disabled={uploading}>
                <Button icon={<UploadOutlined />}>Select Avatar</Button>
              </Upload>
              {avatarImg && (
                <div style={{ marginTop: 12 }}>
                  <img
                    src={avatarImg}
                    alt="avatar preview"
                    style={{
                      maxHeight: 100,
                      borderRadius: 8,
                    }}
                  />
                </div>
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
                onRemove={() => setCoverFile(null)}
                showUploadList={false}
                disabled={uploading}>
                <Button icon={<UploadOutlined />}>Select Cover</Button>
              </Upload>
              {coverImg && (
                <div style={{ marginTop: 12 }}>
                  <img
                    src={coverImg}
                    alt="cover preview"
                    style={{
                      maxHeight: 100,
                      borderRadius: 8,
                    }}
                  />
                </div>
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
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={uploading}>
                Create Brand
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AddBrandModal;
