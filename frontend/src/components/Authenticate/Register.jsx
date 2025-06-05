import React, {useState} from 'react';
import {Button, ConfigProvider, Form, Input, Modal} from "antd";
import './Auth.css'
import {toast} from "react-toastify";
import {register} from "../../services/AuthService";

export default function Register({ open, onClose, onShowLogin, onRegisterSuccess }) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const onFinish = async (values) => {
        setLoading(true);
        try {
            const res = await register(values.email, values.password);
            if (res.status === 201) {
                toast.success("Đăng ký thành công!");
                onRegisterSuccess({ user: res.user, token: res.token });
                form.resetFields();
            }
        } catch (err) {
            if (
                err.response &&
                err.response.status === 400 &&
                err.response.data?.message === "Email already exists"
            ) {
                form.setFields([{
                    name: "email",
                    errors: ["Email đã tồn tại"],
                }]);
            } else {
                toast.error("Đăng ký thất bại. Vui lòng thử lại.");
            }
        } finally {
            setLoading(false);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <ConfigProvider
            theme={{
                components: {
                    Button: {
                        colorPrimary: "#9cee69",
                        colorPrimaryHover: "#85D94F",
                        colorText: "#fff",
                        fontWeight: 600,
                        colorPrimaryActive: "#85D94F",
                    },
                    Input: {
                        hoverBorderColor: "#9CEE69",
                        activeBorderColor: "#9CEE69",
                    },
                },
            }}>
            <Modal open={open} footer={null} centered={true} onCancel={onClose} destroyOnClose>
                <div className="flickzy-modal">
                    <div>
                        <h1 className="flickzy-header">Đăng ký</h1>
                    </div>

                    <Form
                        form={form}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        layout="vertical"
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Vui lòng nhập email' },
                                { type: 'email', message: 'Email không hợp lệ' },
                            ]}
                        >
                            <Input placeholder="Nhập email" style={{ width: "350px" }} />
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[
                                { required: true, message: 'Vui lòng nhập mật khẩu' },
                            ]}
                        >
                            <Input.Password placeholder="Nhập mật khẩu" style={{ width: "350px" }} />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                style={{
                                    width: "350px",
                                    height: "50px",
                                    borderRadius: "5px",
                                    marginTop: "20px",
                                    fontSize: "18px",
                                }}
                            >
                                ĐĂNG KÝ
                            </Button>
                        </Form.Item>
                    </Form>

                    <div>
                        <span className="end-text">Đã có tài khoản?</span>
                        &nbsp;
                        <span className="end-texttext" onClick={onShowLogin}>Đăng nhập ngay</span>
                    </div>
                </div>
            </Modal>
        </ConfigProvider>
    )
}