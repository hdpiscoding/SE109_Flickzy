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
import { toast } from "react-toastify";
const mdParser = new MarkdownIt();
const cld = new Cloudinary({ cloud: { cloudName: "dwye9udip" } });

const EditBrandModal = ({ brand, onSuccess }) => {
  const [avatarFile, setAvatarFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [description, setDescription] = useState("");
  const [intro, setIntro] = useState(""); // Thêm state cho intro
  const [form] = Form.useForm();
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (brand) {
      form.setFieldsValue({
        brandName: brand.brandName,
        intro: brand.intro || "", // set intro vào form
      });
      setAvatarFile(brand.avatar || null); // public_id string
      setCoverFile(brand.cover || null); // public_id string
      setDescription(brand.description || "");
      setIntro(brand.intro || ""); // set intro vào state
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
        message.error("Vui lòng tải lên cả ảnh đại diện và ảnh bìa!");
        setUploading(false);
        return;
      }

      const brandData = {
        brandName: values.brandName,
        avatar: avatarPublicId,
        cover: coverPublicId,
        intro: intro, // Thêm intro vào dữ liệu gửi lên
        description: description,
      };
      await editABrand(brand.id, brandData);
      if (onSuccess) onSuccess();

      toast.success("Cập nhật thương hiệu thành công!");
    } catch (error) {
      toast.error("Cập nhật thương hiệu thất bại!");
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
      <h1>Chỉnh sửa thương hiệu</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="brand-form">
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              label="Tên thương hiệu"
              name="brandName"
              rules={[
                { required: true, message: "Vui lòng nhập tên thương hiệu!" },
              ]}>
              <Input placeholder="Tên thương hiệu" />
            </Form.Item>
          </Col>
        </Row>
        {/* Thêm trường Intro phía trên Description */}
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              label="Giới thiệu ngắn"
              name="intro"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập phần giới thiệu ngắn!",
                },
              ]}>
              <Input
                placeholder="Giới thiệu ngắn về thương hiệu"
                value={intro}
                onChange={(e) => setIntro(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Ảnh đại diện"
              required
              rules={[
                { required: true, message: "Vui lòng tải lên ảnh đại diện!" },
              ]}>
              <Upload
                accept="image/*"
                listType="picture"
                maxCount={1}
                beforeUpload={() => false}
                onChange={handleAvatarChange}
                onRemove={() => setAvatarFile(null)}
                showUploadList={false}
                disabled={uploading}>
                <Button icon={<UploadOutlined />}>Chọn ảnh đại diện</Button>
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
              label="Ảnh bìa"
              required
              rules={[
                { required: true, message: "Vui lòng tải lên ảnh bìa!" },
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
                <Button icon={<UploadOutlined />}>Chọn ảnh bìa</Button>
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
                <span>Mô tả</span>
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
                Lưu thay đổi
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default EditBrandModal;
