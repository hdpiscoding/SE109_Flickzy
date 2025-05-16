import React from 'react';
import {Button, ConfigProvider, Form, Input, Modal} from "antd";
import './Auth.css'

export default function Register() {
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
            <Modal open={true} footer={null} centered={true}>
                <div className="flickzy-modal">
                    <div>
                        <h1 className="flickzy-header">Sign Up</h1>
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
                                { required: true, message: 'Email is required' },
                                { type: 'email', message: 'Invalid email format' },
                            ]}
                        >
                            <Input placeholder="Enter email" style={{ width: "350px" }} />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                { required: true, message: 'Password is required' },
                            ]}
                        >
                            <Input.Password placeholder="Enter password" style={{ width: "350px" }} />
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
                                SIGN UP
                            </Button>
                        </Form.Item>
                    </Form>

                    <div>
                        <span className="end-text">Already have an account?</span>
                        &nbsp;
                        <span className="end-texttext">Log in here</span>
                    </div>
                </div>
            </Modal>
        </ConfigProvider>
    )
}