import React, {useState} from 'react';
import {Button, ConfigProvider, Form, Input, Modal} from "antd";
import { ArrowLeft } from 'lucide-react';
import './Auth.css'
import {forgotPassword} from "../../services/AuthService";
import {toast} from "react-toastify";

export default function ForgotEnterEmail({ open, onClose, onShowLogin, onSuccess }) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await forgotPassword(values.email);
            if (response.status === 200) {
                if (onSuccess) onSuccess(values.email);
                toast.success(response.message);
            } else {
                toast.error(response.message || "Failed to send reset email");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to send reset email");
        }
        finally {
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
                <div style={{ display: "flex", alignItems: "center", gap: '63px', marginTop: '20px' }}>
                    <ArrowLeft style={{width:'30px', height:'30px', cursor:'pointer'}} onClick={onShowLogin}/>
                    <h1 className="flickzy-header">Đặt lại mật khẩu</h1>
                </div>

                <div className="flickzy-modal">
                    <p style={{width: '350px', color: '#333'}}>
                        Nhập địa chỉ email đã liên kết với tài khoản của bạn và chúng tôi sẽ gửi email hướng dẫn đặt lại mật khẩu.
                    </p>

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

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                style={{
                                    width: "350px",
                                    height: "50px",
                                    borderRadius: "5px",
                                    marginTop: "10px",
                                    fontSize: "18px",
                                }}
                            >
                                GỬI
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </ConfigProvider>
    )
}