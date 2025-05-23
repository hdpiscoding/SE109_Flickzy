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
import { AdvancedImage } from "@cloudinary/react";

const mdParser = new MarkdownIt();
const cld = new Cloudinary({ cloud: { cloudName: "dwye9udip" } }); // đổi cloudName nếu cần

const EditBrandModal = ({ brand, onSuccess }) => {
  const [avatarFile, setAvatarFile] = useState(null); // file object hoặc public_id string
  const [coverFile, setCoverFile] = useState(null); // file object hoặc public_id string
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

  // Hàm upload file lên Cloudinary, trả về public_id
  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "ml_default"); // đổi upload_preset nếu cần
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dwye9udip/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const result = await res.json();
    if (result.public_id) return result.public_id;
    throw new Error("Upload failed");
  };

  // Lưu file object vào state, không upload ngay
  const handleAvatarChange = (info) => {
    if (info.file.status === "removed") {
      setAvatarFile(null);
      return;
    }
    const file = info.file.originFileObj;
    if (file && file instanceof Blob) {
      setAvatarFile(file);
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
      setCoverFile(file);
    } else {
      setCoverFile(null);
    }
  };

  const onFinish = async (values) => {
    setUploading(true);
    try {
      let avatarPublicId = avatarFile;
      let coverPublicId = coverFile;

      // Nếu là file object thì upload lên Cloudinary, nếu là string thì giữ nguyên
      if (avatarFile && typeof avatarFile !== "string") {
        avatarPublicId = await uploadToCloudinary(avatarFile);
      }
      if (coverFile && typeof coverFile !== "string") {
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

  // Preview: nếu là string (public_id) thì dùng Cloudinary, nếu là file thì dùng URL.createObjectURL
  const avatarImg = avatarFile
    ? typeof avatarFile === "string"
      ? cld
          .image(avatarFile)
          .format("auto")
          .quality("auto")
          .resize(auto().gravity(autoGravity()).width(100).height(100))
      : URL.createObjectURL(avatarFile)
    : null;
  const coverImg = coverFile
    ? typeof coverFile === "string"
      ? cld
          .image(coverFile)
          .format("auto")
          .quality("auto")
          .resize(auto().gravity(autoGravity()).width(100).height(100))
      : URL.createObjectURL(coverFile)
    : null;

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
              {avatarImg &&
                (typeof avatarFile === "string" ? (
                  <div style={{ marginTop: 12 }}>
                    <AdvancedImage cldImg={avatarImg} />
                  </div>
                ) : (
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
                ))}
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
              {coverImg &&
                (typeof coverFile === "string" ? (
                  <div style={{ marginTop: 12 }}>
                    <AdvancedImage cldImg={coverImg} />
                  </div>
                ) : (
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
                ))}
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
