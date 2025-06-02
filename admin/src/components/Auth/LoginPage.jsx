import React, {useState} from "react"
import {Button, ConfigProvider, Form, Input, message} from "antd";
import {Login} from "../../services/AuthService";
import {toast} from "react-toastify";
import useAuthStore from "../../store/useAuthStore";
import {useNavigate} from "react-router";

export default function LoginPage() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const { login } = useAuthStore();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const res = await Login(values.email, values.password);
            if (res.status === 200) {
                login({ user: res.data.user, token: res.data.token });
                form.resetFields();
                toast.success("Log in successfully!");
                navigate("/", { replace: true });
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
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                borderRadius: '20px',
                padding: '0 20px',
                marginTop: '100px',
                gap: '15px',
            }}>
                <div>
                    <h1 style={{color: '#333'}}>Login</h1>
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
            </div>
        </ConfigProvider>
    )
}