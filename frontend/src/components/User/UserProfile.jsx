import React, {useEffect, useState} from 'react';
import { Tabs, Form, Input, Button, DatePicker, Select, message, ConfigProvider, Upload, Avatar, Table } from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import {getUserProfile, updateUserProfile, updateUserPassword, getUserBookingHistory} from "../../services/UserService";
import {toast} from "react-toastify";
import { uploadToCloudinary } from '../../untils/uploadToCloudinary';
import useAuthStore from "../../store/useAuthStore";

const genderOptions = [
    { value: true, label: 'Nam' },
    { value: false, label: 'Nữ' },
];

// Mock user data
const mockUser = {
    fullName: 'Nguyen Van A',
    birthday: '1998-05-20',
    gender: 'male',
    phone: '0912345678',
    email: 'user@email.com',
    avatar: '' // Add avatar field if needed
};

const mockBookings = [
    {
        bookingId: 'BK001',
        createdAt: '2024-06-01T14:30:00',
        price: 120000,
        movieInfo: { movieName: 'Inception' },
        scheduleInfo: {
            scheduleStart: '2024-06-05T18:00:00',
            scheduleEnd: '2024-06-05T20:30:00'
        }
    },
    {
        bookingId: 'BK002',
        createdAt: '2024-06-02T10:15:00',
        price: 90000,
        movieInfo: { movieName: 'Interstellar' },
        scheduleInfo: {
            scheduleStart: '2024-06-10T15:00:00',
            scheduleEnd: '2024-06-10T17:50:00'
        }
    },
    // ...more bookings
];

export default function UserProfile() {
    const [infoForm] = Form.useForm();
    const [pwdForm] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState(mockUser.avatar);
    const [userState, setUserState] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);
    const [bookings, setBookings] = useState([]);
    const { updateUser } = useAuthStore();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getUserProfile();
                setUserState(userData);
                updateUser({ user: userData });
                infoForm.setFieldsValue({
                    fullname: userData?.fullname,
                    birthday: userData?.birthday ? dayjs(userData?.birthday) : null,
                    gender: userData?.gender,
                    phone: userData?.phone,
                    email: userData?.email,
                });
                setAvatarUrl(userData?.avatar || mockUser.avatar);
            }
            catch (error) {
                console.error(error);
                toast.error('Không thể tải thông tin người dùng');
            }
        }
        fetchUserData();

        // Fetch booking history
        const fetchBookings = async () => {
            try {
                const res = await getUserBookingHistory();
                setBookings(res || []);
            } catch (error) {
                toast.error('Không thể tải lịch sử đặt vé');
            }
        }
        fetchBookings();
    }, []);

    // Handle avatar upload
    const beforeUpload = (file) => {
        setAvatarFile(file);
        const reader = new FileReader();
        reader.onload = e => setAvatarUrl(e.target.result);
        reader.readAsDataURL(file);
        return false; // Prevent default upload
    };

    const onInfoFinish = async (values) => {
        setLoading(true);
        try {
            let uploadedAvatarUrl = avatarUrl;
            // If a new file is selected, upload to Cloudinary
            if (avatarFile) {
                uploadedAvatarUrl = await uploadToCloudinary(avatarFile);
            }
            const body = {
                ...values,
                birthday: values.birthday ? values.birthday.format('YYYY-MM-DD') : null,
                avatar: uploadedAvatarUrl,
            };
            await updateUserProfile(body);
            toast.success('Cập nhật thông tin thành công!');
            updateUser({ user: {id: userState.id, ...body} });
            setAvatarFile(null);
        } catch (error) {
            toast.error('Cập nhật thông tin thất bại!');
        }
        setLoading(false);
    };

    const onPwdFinish = async (values) => {
        setLoading(true);
        try {
            await updateUserPassword({
                currentPassword: values.currentPassword,
                newPassword: values.newPassword,
            });
            toast.success('Đổi mật khẩu thành công!');
            pwdForm.resetFields();
        } catch (error) {
            toast.error('Đổi mật khẩu thất bại!');
        }
        setLoading(false);
    };

    const columns = [
        {
            title: 'Mã',
            dataIndex: 'bookingId',
            key: 'bookingId',
            width: 100,
        },
        {
            title: 'Thời điểm đặt',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text) => dayjs(text).format('DD/MM/YYYY HH:mm'),
            width: 160,
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (price) => price.toLocaleString() + ' đ',
            width: 100,
        },
        {
            title: 'Tên phim',
            dataIndex: ['movieInfo', 'movieName'],
            key: 'movieName',
            width: 180,
        },
        {
            title: 'Suất chiếu',
            key: 'schedule',
            render: (_, record) => {
                const start = record.scheduleInfo?.scheduleStart;
                const end = record.scheduleInfo?.scheduleEnd;
                return start && end ? `${start} ~ ${end}` : '--';
            },
            width: 140,
        }
    ];


    return (
        <ConfigProvider
            theme={{
                components: {
                    Input: { activeBorderColor: '#9CEE69', hoverBorderColor: '#9CEE69' },
                    Tabs: {inkBarColor: '#9CEE69', itemActiveColor: '#85D94F', itemHoverColor: '#9cee69', itemSelectedColor: '#85D94F'},
                    Button: { colorPrimary: "#9cee69", colorPrimaryHover: "#85D94F", fontWeight: 600, colorPrimaryActive: "#85D94F" },
                    Select: { colorPrimary: "#9cee69", colorPrimaryHover: "#85D94F", colorPrimaryActive: "#85D94F" },
                    DatePicker: { colorPrimary: "#9cee69", colorPrimaryHover: "#85D94F", colorPrimaryActive: "#85D94F" },
                    Pagination: { colorPrimary: "#6cc832", colorPrimaryHover: "#9cee69", colorPrimaryBorder: "#6cc832" },
                }
            }}
        >
            <div style={{display: 'grid', gridTemplateColumns: '1.5fr 9fr 1.5fr'}}>
                <div style={{ gridColumnStart: 2, marginTop: '60px', background: '#fff', padding: 32, borderRadius: 8 }}>
                    <Tabs
                        defaultActiveKey="1"
                        centered
                        items={[
                            {
                                key: '1',
                                label: 'Thông tin cá nhân',
                                children: (
                                    <>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
                                            <Avatar
                                                size={96}
                                                src={avatarUrl}
                                                icon={<UserOutlined />}
                                                style={{ marginBottom: 8 }}
                                            />
                                            <Upload
                                                showUploadList={false}
                                                beforeUpload={beforeUpload}
                                                accept="image/*"
                                            >
                                                <Button icon={<UploadOutlined />}>Thay đổi ảnh đại diện</Button>
                                            </Upload>
                                        </div>
                                        <Form
                                            form={infoForm}
                                            layout="vertical"
                                            onFinish={onInfoFinish}
                                        >
                                            <Form.Item
                                                name="fullname"
                                                label="Họ tên"
                                            >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item
                                                name="birthday"
                                                label="Ngày sinh"
                                            >
                                                <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                                            </Form.Item>
                                            <Form.Item
                                                name="gender"
                                                label="Giới tính"
                                            >
                                                <Select options={genderOptions} placeholder="Chọn giới tính" />
                                            </Form.Item>
                                            <Form.Item
                                                name="phone"
                                                label="Số điện thoại"
                                                rules={[
                                                    { pattern: /^0\d{9,10}$/, message: 'Số điện thoại không hợp lệ' }
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item
                                                name="email"
                                                label="Email"
                                            >
                                                <Input disabled />
                                            </Form.Item>
                                            <Form.Item>
                                                <Button type="primary" htmlType="submit" loading={loading}>Cập nhật</Button>
                                            </Form.Item>
                                        </Form>
                                    </>
                                )
                            },
                            {
                                key: '2',
                                label: 'Đổi mật khẩu',
                                children: (
                                    <Form
                                        form={pwdForm}
                                        layout="vertical"
                                        onFinish={onPwdFinish}
                                    >
                                        <Form.Item
                                            name="currentPassword"
                                            label="Mật khẩu hiện tại"
                                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại' }]}
                                        >
                                            <Input.Password />
                                        </Form.Item>
                                        <Form.Item
                                            name="newPassword"
                                            label="Mật khẩu mới"
                                            rules={[
                                                { required: true, message: 'Vui lòng nhập mật khẩu mới' },
                                                { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' }
                                            ]}
                                        >
                                            <Input.Password />
                                        </Form.Item>
                                        <Form.Item
                                            name="confirmPassword"
                                            label="Xác nhận mật khẩu mới"
                                            dependencies={['newPassword']}
                                            rules={[
                                                { required: true, message: 'Vui lòng xác nhận mật khẩu mới' },
                                                ({ getFieldValue }) => ({
                                                    validator(_, value) {
                                                        if (!value || getFieldValue('newPassword') === value) {
                                                            return Promise.resolve();
                                                        }
                                                        return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                                                    }
                                                })
                                            ]}
                                        >
                                            <Input.Password />
                                        </Form.Item>
                                        <Form.Item>
                                            <Button type="primary" htmlType="submit" loading={loading}>Đổi mật khẩu</Button>
                                        </Form.Item>
                                    </Form>
                                )
                            },
                            {
                                key: '3',
                                label: 'Lịch sử đặt vé',
                                children: (
                                    <Table
                                        columns={columns}
                                        dataSource={bookings}
                                        rowKey="bookingId"
                                        pagination={{ pageSize: 5 }}
                                        style={{ marginTop: 16 }}
                                    />
                                )
                            }
                        ]}
                    />
                </div>
            </div>
        </ConfigProvider>
    );
}