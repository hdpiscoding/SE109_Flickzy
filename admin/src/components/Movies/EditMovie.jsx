import React, { useEffect } from 'react';
import {Form, Input, Button, Select, DatePicker, ConfigProvider, message, Modal, Card, Flex, InputNumber} from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import {getMovieDetail, getMovieShowing, getAllGenres, updateMovieShowing, updateMovie} from "../../services/MovieService";
import {toast} from "react-toastify";

const ageRatingOptions = [
    { value: 'P', label: 'P' },
    { value: '13+', label: '13+' },
    { value: '16+', label: '16+' },
    { value: '18+', label: '18+' }
];

const isExpired = (endDate) => {
    return new Date(endDate) < new Date();
};

const mapGenresToOptions = (genres) => {
    return genres.map(g => ({
        value: g.id,
        label: g.name
    }));
}

export default function EditMovie() {
    const { movieId } = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [showingModalOpen, setShowingModalOpen] = React.useState(false);
    const [showing, setShowing] = React.useState(null);
    const [showingForm] = Form.useForm();
    const [movie, setMovie] = React.useState(null);
    const [genreList, setGenreList] = React.useState([]);

    useEffect(() => {
        fetchMovie(movieId);
    }, [movieId]);

    useEffect(() => {
        form.setFieldsValue({
            movieName: movie?.movieName,
            movieDescription: movie?.movieDescription,
            movieContent: movie?.movieContent,
            movieTrailer: movie?.movieTrailer,
            genres: movie?.genres?.map(g => g.id) || [],
            movieRelease: dayjs(movie?.movieRelease),
            moviePoster: movie?.moviePoster,
            movieBackground: movie?.movieBackground,
            movieNation: movie?.movieNation,
            movieLength: parseInt(movie?.movieLength),
            movieActors: movie?.movieActors,
            movieDirector: movie?.movieDirector,
            ageRating: movie?.ageRating,
            movieShowing: showing || undefined,
        });
    }, [movie, showing]);

    const fetchMovie = async (id) => {
        try {
            const [movieDetailResponse, showingsResponse, genresResponse] = await Promise.all([
                getMovieDetail(id),
                getMovieShowing(id),
                getAllGenres()
            ]);
            // Only get the first non-expired showing (if any)
            const now = dayjs();
            const currentShowing = showingsResponse?.find(s => !isExpired(s.endDate));
            setMovie(movieDetailResponse);
            setShowing(currentShowing || null);
            setGenreList(mapGenresToOptions(genresResponse) || []);
        } catch (e) {
            setMovie(null);
        }
    };

    const handleAddOrEditShowing = () => {
        setShowingModalOpen(true);
        if (showing) {
            showingForm.setFieldsValue({
                name: showing.name,
                startDate: dayjs(showing.startDate),
                endDate: dayjs(showing.endDate)
            });
        } else {
            showingForm.resetFields();
        }
    };

    const handleShowingOk = () => {
        showingForm.validateFields().then(values => {
            const newShowing = {
                name: values.name,
                startDate: values.startDate.format('YYYY-MM-DD'),
                endDate: values.endDate.format('YYYY-MM-DD')
            };
            setShowing(newShowing);
            setShowingModalOpen(false);
            form.setFieldsValue({ movieShowing: newShowing });
        });
    };

    const onFinish = async (values) => {
        try {
            // Prepare genres as array of {id}
            const genres = values.genres.map(id => ({ id }));

            // Prepare movie data
            const movieData = {
                ...values,
                genres,
                movieRelease: values.movieRelease.format('YYYY-MM-DD'),
            };

            // Update movie
            await updateMovie(movieId, movieData);

            // Update movie showing if exists
            if (values.movieShowing && values.movieShowing.id) {
                const showingData = {
                    ...values.movieShowing,
                    // Ensure dates are in correct format
                    startDate: dayjs(values.movieShowing.startDate).format('YYYY-MM-DD'),
                    endDate: dayjs(values.movieShowing.endDate).format('YYYY-MM-DD'),
                };
                await updateMovieShowing(values.movieShowing.id, showingData);
            }

            toast.success('Cập nhật phim thành công!');
            navigate(`/movies/${movieId}`);
        } catch (error) {
            toast.error('Cập nhật phim hoặc suất chiếu thất bại');
        }
    };

    return (
        <ConfigProvider theme={{
            components: {
                Input: {
                    activeBorderColor: '#9CEE69',
                    hoverBorderColor: '#9CEE69',
                    activeShadow: '0 0 0 1px #9CEE69'
                },
                Button: {
                    colorPrimary: "#9cee69",
                    colorPrimaryHover: "#85D94F",
                    colorText: "#fff",
                    fontWeight: 600,
                    colorPrimaryActive: "#85D94F",
                    primaryShadow: "0 0px 0 #9cee69",
                },
                Select: {
                    colorPrimary: "#9cee69",
                    colorPrimaryHover: "#85D94F",
                    colorPrimaryActive: "#85D94F",
                    colorPrimaryBorder: "#9CEE69",
                    activeShadow: '0 0 0 1px #9CEE69',
                    activeBorderColor: '#9CEE69',
                    primaryShadow: "0 0px 0 #9cee69",
                    optionSelectedBg: 'rgba(0,0,0,0.04)',
                },
                DatePicker: {
                    colorPrimary: "#9cee69",
                    colorPrimaryHover: "#85D94F",
                    colorPrimaryActive: "#85D94F",
                    activeShadow: '0 0 0 1px #9CEE69',
                    primaryShadow: "0 0px 0 #9cee69",
                }
            }
        }}>
            <div style={{ marginTop: '10px', background: '#fff', padding: 32, borderRadius: 8 }}>
                <Button onClick={() => navigate(`/movies/${movieId}`)} style={{ marginBottom: 16, color: '#333' }}>Quay lại</Button>
                <h2>Chỉnh sửa phim</h2>
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    {/* Same fields as AddMovie */}
                    <Form.Item name="movieName" label="Tên phim" rules={[{ required: true }]}>
                        <Input placeholder="Nhập tên phim" />
                    </Form.Item>
                    <Form.Item name="movieDescription" label="Mô tả" rules={[{ required: true }]}>
                        <Input placeholder="Nhập mô tả" />
                    </Form.Item>
                    <Form.Item name="movieContent" label="Nội dung" rules={[{ required: true }]}>
                        <Input.TextArea rows={3} placeholder="Nhập nội dung phim" />
                    </Form.Item>
                    <Form.Item name="movieTrailer" label="Trailer (URL)">
                        <Input placeholder="Nhập đường dẫn trailer" />
                    </Form.Item>
                    <Form.Item name="genres" label="Thể loại" rules={[{ required: true }]}>
                        <Select mode="multiple" options={genreList} placeholder="Chọn thể loại..." />
                    </Form.Item>
                    <Form.Item name="movieRelease" label="Ngày khởi chiếu" rules={[{ required: true }]}>
                        <DatePicker style={{ width: '100%' }} placeholder="Chọn ngày khởi chiếu" />
                    </Form.Item>
                    <Form.Item name="moviePoster" label="Poster (URL)" rules={[{ required: true }]}>
                        <Input placeholder="Nhập đường dẫn poster" />
                    </Form.Item>
                    <Form.Item name="movieBackground" label="Ảnh nền (URL)" rules={[{ required: true }]}>
                        <Input placeholder="Nhập đường dẫn ảnh nền" />
                    </Form.Item>
                    <Form.Item name="movieNation" label="Quốc gia" rules={[{ required: true }]}>
                        <Input placeholder="Nhập quốc gia sản xuất" />
                    </Form.Item>
                    <Form.Item name="movieLength" label="Thời lượng (phút)" rules={[{ required: true, type: 'number', min: 1, message: 'Nhập số phút hợp lệ' }]}>
                        <InputNumber style={{ width: '100%' }} min={1} placeholder="Nhập thời lượng phim" />
                    </Form.Item>
                    <Form.Item name="movieActors" label="Diễn viên" rules={[{ required: true }]}>
                        <Input placeholder="Nhập tên diễn viên" />
                    </Form.Item>
                    <Form.Item name="movieDirector" label="Đạo diễn" rules={[{ required: true }]}>
                        <Input placeholder="Nhập tên đạo diễn" />
                    </Form.Item>
                    <Form.Item name="ageRating" label="Phân loại độ tuổi" rules={[{ required: true }]}>
                        <Select options={ageRatingOptions} placeholder="Chọn phân loại độ tuổi..." />
                    </Form.Item>
                    <Form.Item label="Suất chiếu" name="movieShowing">
                        <div>
                            <Button type='dashed' style={{ color: '#9CEE69', borderColor: '#9CEE69' }} onClick={handleAddOrEditShowing}>
                                {showing ? "Chỉnh sửa suất chiếu" : "Thêm suất chiếu"}
                            </Button>
                            {showing && (
                                <div style={{ marginTop: 16, cursor: 'pointer' }} onClick={handleAddOrEditShowing}>
                                    <Card
                                        size="small"
                                        title={showing.name}
                                        bordered={true}
                                        style={{
                                            background: "#f6ffed",
                                            borderColor: "#b7eb8f",
                                            minWidth: 200,
                                            marginTop: 8
                                        }}
                                    >
                                        <div>
                                            <b>Ngày bắt đầu:</b> {showing.startDate}
                                        </div>
                                        <div>
                                            <b>Ngày kết thúc:</b> {showing.endDate}
                                        </div>
                                    </Card>
                                </div>
                            )}
                        </div>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Lưu</Button>
                    </Form.Item>
                </Form>
            </div>
            <Modal
                title="Suất chiếu"
                open={showingModalOpen}
                onOk={handleShowingOk}
                onCancel={() => setShowingModalOpen(false)}
                destroyOnClose
                footer={
                    <Flex justify="end" gap={8}>
                        <Button style={{ color: '#b7b7b7' }} onClick={() => setShowingModalOpen(false)}>
                            Hủy
                        </Button>
                        <Button type="primary" onClick={handleShowingOk}>
                            Lưu
                        </Button>
                    </Flex>
                }
            >
                <Form form={showingForm} layout="vertical">
                    <Form.Item name="name" label="Tên suất chiếu" rules={[{ required: true }]}>
                        <Input placeholder="Nhập tên suất chiếu" />
                    </Form.Item>
                    <Form.Item name="startDate" label="Ngày bắt đầu" rules={[{ required: true }]}>
                        <DatePicker style={{ width: '100%' }} placeholder="Chọn ngày bắt đầu" />
                    </Form.Item>
                    <Form.Item name="endDate" label="Ngày kết thúc" rules={[{ required: true }]}>
                        <DatePicker style={{ width: '100%' }} placeholder="Chọn ngày kết thúc" />
                    </Form.Item>
                </Form>
            </Modal>
        </ConfigProvider>
    );
}