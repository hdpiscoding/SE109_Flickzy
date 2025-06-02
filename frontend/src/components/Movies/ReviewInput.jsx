import {Rate, Input, Button, message, ConfigProvider} from 'antd';
import { useState } from 'react';

function ReviewInput({ onSubmit }) {
    const [rating, setRating] = useState(0);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        if (!rating || !content.trim()) {
            message.warning('Vui lòng nhập đánh giá và nội dung đánh giá.');
            return;
        }
        setLoading(true);
        onSubmit({ rating, content });
        setRating(0);
        setContent('');
        setLoading(false);
    };

    return (
        <ConfigProvider theme={{
            components: {
                Input: {
                    activeBorderColor: '#9CEE69',
                    hoverBorderColor: '#9CEE69',
                },
                Button: {
                    colorPrimary: "#9cee69",
                    colorPrimaryHover: "#85D94F",
                    colorText: "#fff",
                    fontWeight: 600,
                    colorPrimaryActive: "#85D94F",
                },
            },
        }}>
            <div style={{ marginBottom: 24, background: '#fafafa', padding: 16, borderRadius: 8 }}>
                <div style={{ marginBottom: 8 }}>
                    <span style={{ fontWeight: 500, color: '#333' }}>Đánh giá: </span>
                    <Rate value={rating} onChange={setRating} />
                </div>
                <Input.TextArea
                    rows={3}
                    placeholder="Viết đánh giá của bạn..."
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    style={{ marginBottom: 8 }}
                />
                <Button type="primary" onClick={handleSubmit} loading={loading}>
                    Đăng tải
                </Button>
            </div>
        </ConfigProvider>
    );
}

export default ReviewInput;