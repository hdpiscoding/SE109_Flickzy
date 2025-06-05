import React, {useState} from "react"
import {Button, ConfigProvider, Form, Input, message, Modal} from "antd";
import './Auth.css'
import {login} from "../../services/AuthService";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

export default function Login({ open, onClose, onLoginSuccess, onShowRegister, onShowForgot }) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const res = await login(values.email, values.password);
            if (res.status === 200) {
                message.success("Đăng nhập thành công!");
                onLoginSuccess({ user: res.data.user, token: res.data.token });
                form.resetFields();
                toast.success("Đăng nhập thành công!");
                navigate("/");
            }
        } catch (err) {
            if (
                err.response &&
                err.response.status === 401 &&
                err.response.data?.error === "Unauthorized"
            ) {
                toast.error("Thông tin đăng nhập không chính xác.");
            } else {
                toast.error("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
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
                        <h1 className="flickzy-header">Đăng nhập</h1>
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

                        <div className="forgot-password-container">
                            <span className="forgot-password" onClick={onShowForgot}>Quên mật khẩu?</span>
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
                                ĐĂNG NHẬP
                            </Button>
                        </Form.Item>
                    </Form>

                    <div>
                        <span className="end-text">Chưa có tài khoản?</span>
                        &nbsp;
                        <span className="end-texttext" onClick={onShowRegister}>Đăng ký ngay</span>
                    </div>
                </div>
            </Modal>
        </ConfigProvider>
    )
}