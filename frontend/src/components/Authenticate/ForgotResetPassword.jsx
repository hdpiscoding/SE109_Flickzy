import React, {useState} from 'react';
import { Button, ConfigProvider, Form, Input, Modal } from "antd";
import './Auth.css';
import {ArrowLeft} from "lucide-react";
import {toast} from "react-toastify";
import {resetPassword} from "../../services/AuthService";

export default function ForgotResetPassword({ open, onClose, onShowForgot, onSuccess, email }) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await resetPassword(values.otp, email, values.newPassword);
            if (response.status === 400) {
                toast.error(response.message);
            } else if (response.status === 200) {
                toast.success(response.message);
                if (onSuccess) onSuccess();
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Reset password failed");
        } finally {
            setLoading(false);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    // Custom validation function to check if confirm password matches password
    const validateConfirmPassword = ({ getFieldValue }) => ({
        validator(_, value) {
            if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve();
            }
            return Promise.reject(new Error('Hai mật khẩu bạn nhập không khớp!'));
        },
    });

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
                <div style={{ display: "flex", alignItems: "center", gap: '68px', marginTop: '20px' }}>
                    <ArrowLeft style={{width:'30px', height:'30px', cursor:'pointer'}} onClick={onShowForgot}/>
                    <h1 className="flickzy-header">Mật khẩu mới</h1>
                </div>

                <div className="flickzy-modal">
                    <Form
                        form={form}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        layout="vertical"
                    >
                        <Form.Item
                            label="Mã OTP"
                            name="otp"
                            rules={[
                                { required: true, message: 'Vui lòng nhập mã OTP' },
                                { pattern: /^\d{6}$/, message: 'OTP phải gồm đúng 6 chữ số' },
                            ]}
                        >
                            <Input.OTP
                                length={6}
                                inputType="numeric"
                                style={{ width: "350px" }}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu mới"
                            name="newPassword"
                            rules={[
                                { required: true, message: 'Vui lòng nhập mật khẩu mới' },
                            ]}
                        >
                            <Input.Password placeholder="Nhập mật khẩu mới" style={{ width: "350px" }} />
                        </Form.Item>

                        <Form.Item
                            label="Xác nhận mật khẩu"
                            name="confirm_password"
                            dependencies={['password']}
                            rules={[
                                { required: true, message: 'Vui lòng xác nhận mật khẩu' },
                                validateConfirmPassword,
                            ]}
                        >
                            <Input.Password placeholder="Nhập lại mật khẩu" style={{ width: "350px" }} />
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
                                TẠO MỚI
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </ConfigProvider>
    )
}
