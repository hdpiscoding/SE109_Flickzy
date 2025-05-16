import React from 'react';
import { Button, ConfigProvider, Form, Input, Modal } from "antd";
import './Auth.css';
import {ArrowLeft} from "lucide-react";

export default function ForgotResetPassword() {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    // Custom validation function to check if confirm password matches password
    const validateConfirmPassword = ({ getFieldValue }) => ({
        validator(_, value) {
            if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
            }
            return Promise.reject(new Error('The two passwords that you entered do not match!'));
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
            <Modal open={true} footer={null} centered={true}>
                <div style={{ display: "flex", alignItems: "center", gap: '68px', marginTop: '20px' }}>
                    <ArrowLeft style={{width:'30px', height:'30px', cursor:'pointer'}}/>
                    <h1 className="flickzy-header">New Password</h1>
                </div>

                <div className="flickzy-modal">
                    <Form
                        form={form}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        layout="vertical"
                    >
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                { required: true, message: 'Password is required' },
                            ]}
                        >
                            <Input.Password placeholder="Enter password" style={{ width: "350px" }} />
                        </Form.Item>

                        <Form.Item
                            label="Confirm Password"
                            name="confirm_password"
                            dependencies={['password']}
                            rules={[
                                { required: true, message: 'Confirm password is required' },
                                validateConfirmPassword,
                            ]}
                        >
                            <Input.Password placeholder="Enter confirm password" style={{ width: "350px" }} />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{
                                    width: "350px",
                                    height: "50px",
                                    borderRadius: "5px",
                                    marginTop: "20px",
                                    fontSize: "18px",
                                }}
                            >
                                CREATE
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </ConfigProvider>
    )
}
