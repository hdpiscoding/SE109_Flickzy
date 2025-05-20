import React from 'react';
import {Button, ConfigProvider, Form, Input, Modal} from "antd";
import { ArrowLeft } from 'lucide-react';
import './Auth.css'

export default function ForgotEnterEmail({ open, onClose, onShowLogin }) {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log("Success:", values);
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
                    <h1 className="flickzy-header">Reset Password</h1>
                </div>

                <div className="flickzy-modal">
                    <p style={{width: '350px', color: '#333'}}>
                        Enter your email address that linked to your account and we’ll send you an email.
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
                                { required: true, message: 'Email is required' },
                                { type: 'email', message: 'Invalid email format' },
                            ]}
                        >
                            <Input placeholder="Enter email" style={{ width: "350px" }} />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{
                                    width: "350px",
                                    height: "50px",
                                    borderRadius: "5px",
                                    marginTop: "10px",
                                    fontSize: "18px",
                                }}
                            >
                                SEND
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </ConfigProvider>
    )
}