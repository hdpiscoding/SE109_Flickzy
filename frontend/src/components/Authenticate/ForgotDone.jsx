import React from 'react';
import {Button, ConfigProvider, Form, Input, Modal} from "antd";
import { ArrowLeft } from 'lucide-react';
import './Auth.css'

export default function ForgotDone({open, onClose, onDone}) {
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
            <Modal open={open} footer={null} centered={true}>
                <div className="flickzy-modal">
                    <div>
                        <h1 className="flickzy-header">Hoàn tất</h1>
                    </div>

                    <p style={{width: '350px', color: '#333'}}>
                        Mật khẩu của bạn đã được cập nhật thành công, bạn đã đăng nhập vào hệ thống.
                    </p>

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
                        onClick={onDone}
                    >
                        OK
                    </Button>
                </div>
            </Modal>
        </ConfigProvider>
    )
}