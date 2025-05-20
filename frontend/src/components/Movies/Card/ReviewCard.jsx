import React from 'react';
import { Card, Avatar, Rate, Typography, Space, Flex } from 'antd';

const { Text } = Typography;

export default function ReviewCard({ avatar, username, date, rating, content }) {
    return (
        <Card variant="borderless" style={{ marginBottom: 16 }}>
            <Space align="start">
                <Avatar src={avatar} size={48} />
                <div>
                    <Flex gap={10} align="end">
                        <Text strong>{username}</Text>
                        <Text type="secondary" style={{ fontSize: 12 }}>{date}</Text>
                    </Flex>
                    <div style={{ margin: '4px 0' }}>
                        <Rate disabled value={rating} allowHalf />
                    </div>
                    <Text>{content}</Text>
                </div>
            </Space>
        </Card>
    );
}