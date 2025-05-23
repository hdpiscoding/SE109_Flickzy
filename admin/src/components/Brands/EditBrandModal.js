import React, { useState, useEffect } from "react";
import { Form, Input, Button, Upload, Row, Col, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./EditBrandModal.scss";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import MarkdownIt from "markdown-it";
import { editABrand } from "../../services/brandService";
import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { uploadToCloudinary } from "../../untils/uploadToCloudinary";

const mdParser = new MarkdownIt();
const cld = new Cloudinary({ cloud: { cloudName: "dwye9udip" } });

const EditBrandModal = ({ brand, onSuccess }) => {
  const [avatarFile, setAvatarFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [description, setDescription] = useState("");
  const [form] = Form.useForm();
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (brand) {
      form.setFieldsValue({
        brandName: brand.brandName,
      });
      setAvatarFile(brand.avatar || null); // public_id string
      setCoverFile(brand.cover || null); // public_id string
      setDescription(brand.description || "");
    }
  }, [brand, form]);

  const onFinish = async (values) => {
    setUploading(true);
    try {
      let avatarPublicId = avatarFile;
      let coverPublicId = coverFile;

      // Chỉ upload nếu là file object (Blob)
      if (avatarFile && avatarFile instanceof Blob) {
        avatarPublicId = await uploadToCloudinary(avatarFile);
      }
      if (coverFile && coverFile instanceof Blob) {
        coverPublicId = await uploadToCloudinary(coverFile);
      }

      if (!avatarPublicId || !coverPublicId) {
        message.error("Please upload both avatar and cover!");
        setUploading(false);
        return;
      }

      const brandData = {
        brandName: values.brandName,
        avatar: avatarPublicId,
        cover: coverPublicId,
        description: description,
      };
      await editABrand(brand.id, brandData);
      if (onSuccess) onSuccess();
    } catch (error) {
      message.error("Save failed!");
    }
    setUploading(false);
  };

  // Preview: giống EditBlogsModal, chỉ dùng <img>
  const avatarImg = avatarFile
    ? typeof avatarFile === "string"
      ? avatarFile
      : URL.createObjectURL(avatarFile)
    : null;
  const coverImg = coverFile
    ? typeof coverFile === "string"
      ? coverFile
      : URL.createObjectURL(coverFile)
    : null;

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
                onRemove={() => setAvatarFile(null)}
                showUploadList={false}
                disabled={uploading}>
                <Button icon={<UploadOutlined />}>Select Avatar</Button>
              </Upload>
              {avatarImg && (
                <div style={{ marginTop: 12 }}>
                  <img
                    key={avatarImg}
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
                    key={coverImg}
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
