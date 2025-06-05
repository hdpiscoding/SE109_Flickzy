import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import "./AddCinemaModal.scss";
import { addACinema } from "../../services/cinemaService";
import { getAllBrand } from "../../services/brandService";
import { toast } from "react-toastify";

const AddCinemaModal = ({ onSuccess }) => {
  const [brands, setBrands] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await getAllBrand();
        setBrands(res.data || []);
      } catch (e) {
        setBrands([]);
      }
    };
    fetchBrands();
    // Fetch provinces
    const fetchProvinces = async () => {
      try {
        const res = await fetch(
          "https://open.oapi.vn/location/provinces?page=0&size=63"
        );
        const data = await res.json();
        setProvinces(data.data || []);
      } catch (e) {
        setProvinces([]);
      }
    };
    fetchProvinces();
  }, []);

  const onFinish = async (values) => {
    const cinemaData = {
      cinemaName: values.cinemaName,
      brandId: values.brandId,
      cinemaAddress: values.cinemaAddress,
      province: values.province,
    };
    try {
      await addACinema(cinemaData);
      if (onSuccess) onSuccess();

      toast.success("Thêm rạp phim thành công!");
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Thêm rạp phim thất bại:", error);
    }
  };

  return (
    <div className="cinema-form-container">
      <h1>Thêm rạp phim mới</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="cinema-form">
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              label="Tên rạp phim"
              name="cinemaName"
              rules={[
                { required: true, message: "Vui lòng nhập tên rạp phim!" },
              ]}>
              <Input placeholder="Tên rạp phim" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Thương hiệu"
              name="brandId"
              rules={[
                { required: true, message: "Vui lòng chọn thương hiệu!" },
              ]}>
              <select className="ant-input" style={{ width: "100%" }}>
                <option value="">Chọn thương hiệu</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.brandName}
                  </option>
                ))}
              </select>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Tỉnh/Thành phố"
              name="province"
              rules={[
                { required: true, message: "Vui lòng chọn tỉnh/thành phố!" },
              ]}>
              <select className="ant-input" style={{ width: "100%" }}>
                <option value="">Chọn tỉnh/thành phố</option>
                {provinces.map((province) => (
                  <option key={province.id} value={province.name}>
                    {province.name}
                  </option>
                ))}
              </select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              label="Địa chỉ"
              name="cinemaAddress"
              rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}>
              <Input placeholder="Địa chỉ rạp phim" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Thêm rạp phim
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AddCinemaModal;
