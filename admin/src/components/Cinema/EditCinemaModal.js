import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import "./EditCinemaModal.scss";
import { editACinema } from "../../services/cinemaService";
import { getAllBrand } from "../../services/brandService";

const EditCinemaModal = ({ cinema, onSuccess }) => {
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
    if (cinema) {
      form.setFieldsValue({
        cinemaName: cinema.cinemaName,
        brandId: cinema.brandId,
        cinemaAddress: cinema.cinemaAddress,
        province: cinema.province,
      });
    }
  }, [cinema, form]);

  const onFinish = async (values) => {
    const cinemaData = {
      cinemaName: values.cinemaName,
      brandId: values.brandId,
      cinemaAddress: values.cinemaAddress,
      province: values.province,
    };
    try {
      await editACinema(cinema.id, cinemaData);
      if (onSuccess) onSuccess();
    } catch (error) {
      // handle error
    }
  };

  return (
    <div className="cinema-form-container">
      <h1>Edit Cinema</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="cinema-form">
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              label="Cinema Name"
              name="cinemaName"
              rules={[
                { required: true, message: "Please input the cinema name!" },
              ]}>
              <Input placeholder="Cinema Name" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Brand"
              name="brandId"
              rules={[{ required: true, message: "Please select a brand!" }]}>
              <select className="ant-input" style={{ width: "100%" }}>
                <option value="">Select Brand</option>
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
              label="Province"
              name="province"
              rules={[
                { required: true, message: "Please select a province!" },
              ]}>
              <select className="ant-input" style={{ width: "100%" }}>
                <option value="">Select Province</option>
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
              label="Address"
              name="cinemaAddress"
              rules={[
                { required: true, message: "Please input the address!" },
              ]}>
              <Input placeholder="Cinema Address" />
            </Form.Item>
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

export default EditCinemaModal;
