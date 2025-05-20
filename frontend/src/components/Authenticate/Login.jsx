import React, {useState} from "react"
import {Button, ConfigProvider, Form, Input, message, Modal} from "antd";
import './Auth.css'
import {login} from "../../services/AuthService";
import {toast} from "react-toastify";

export default function Login({ open, onClose, onLoginSuccess, onShowRegister, onShowForgot }) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const res = await login(values.email, values.password);
            if (res.status === 200) {
                message.success("Login successful!");
                onLoginSuccess({ user: res.data.user, token: res.data.token });
                form.resetFields();
                toast.success("Log in successfully!");
            }
        } catch (err) {
            if (
                err.response &&
                err.response.status === 401 &&
                err.response.data?.error === "Unauthorized"
            ) {
                toast.error("Incorrect login information.");
            } else {
                toast.error("Login failed. Please check your credentials.");
            }
            console.log("Login failed:", err);
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
                        <h1 className="flickzy-header">Login</h1>
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

                        <div className="forgot-password-container">
                            <span className="forgot-password" onClick={onShowForgot}>Forgot your password?</span>
                        </div>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                style={{
                                    width: "350px",
                                    height: "50px",
                                    borderRadius: "5px",
                                    fontSize: "18px",
                                }}
                            >
                                LOG IN
                            </Button>
                        </Form.Item>
                    </Form>

                    <div>
                        <span className="end-text">Don't have an account?</span>
                        &nbsp;
                        <span className="end-texttext" onClick={onShowRegister}>Sign up here</span>
                    </div>
                </div>
            </Modal>
        </ConfigProvider>
    )
}