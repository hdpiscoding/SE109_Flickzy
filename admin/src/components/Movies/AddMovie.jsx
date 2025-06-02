import React, {useEffect} from 'react';
import {Form, Input, Button, Select, DatePicker, ConfigProvider, Modal, Card, Flex, InputNumber} from 'antd';
import dayjs from 'dayjs';
import {useNavigate} from "react-router";
import { createMovie, createMovieShowing, getAllGenres } from "../../services/MovieService";
import { toast } from "react-toastify";

const ageRatingOptions = [
    { value: 'P', label: 'P' },
    { value: '13+', label: '13+' },
    { value: '16+', label: '16+' },
    { value: '18+', label: '18+' }
];

const mapGenresToOptions = (genres) => {
    return genres.map(g => ({
        value: g.id,
        label: g.name
    }));
}

export default function AddMovie() {
    const [form] = Form.useForm();
    const [showingModalOpen, setShowingModalOpen] = React.useState(false);
    const [showing, setShowing] = React.useState(null);
    const [showingForm] = Form.useForm();
    const navigate = useNavigate();
    const [genreList, setGenreList] = React.useState([]);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const genres = await getAllGenres();
                setGenreList(mapGenresToOptions(genres));
            } catch (error) {
                console.error("Error fetching genres:", error);
                toast.error('Failed to load genres');
            }
        }
        fetchGenres();
    }, []);

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

            // Create movie
            const createdMovie = await createMovie(movieData);

            // Create movie showing if exists
            if (values.movieShowing) {
                const showingData = {
                    ...values.movieShowing,
                    startDate: values.movieShowing.startDate,
                    endDate: values.movieShowing.endDate,
                };
                await createMovieShowing(createdMovie.id, showingData);
            }

            toast.success('Movie added successfully!');
            navigate('/movies');
        } catch (error) {
            toast.error('Failed to add movie or showing');
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
            // Set to main form as well
            form.setFieldsValue({ movieShowing: newShowing });
        });
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
            },
        }}>
            <div style={{ marginTop: '10px', background: '#fff', padding: 32, borderRadius: 8 }}>
                <Button onClick={() => navigate('/movies')} style={{ marginBottom: 16, color: '#333' }}>Back</Button>
                <h2>Thêm phim mới</h2>
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item name="movieName" label="Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="movieDescription" label="Description" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="movieContent" label="Content" rules={[{ required: true }]}>
                        <Input.TextArea rows={3} />
                    </Form.Item>
                    <Form.Item name="movieTrailer" label="Trailer (URL)">
                        <Input />
                    </Form.Item>
                    <Form.Item name="genres" label="Genres" rules={[{ required: true }]}>
                        <Select mode="multiple" options={genreList} placeholder="Choose genre..." />
                    </Form.Item>
                    <Form.Item name="movieRelease" label="Release Date" rules={[{ required: true }]}>
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="moviePoster" label="Poster (URL)" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="movieBackground" label="Background (URL)" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="movieNation" label="Nation" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="movieLength" label="Duration (min)" rules={[{ required: true, type: 'number', min: 1, message: 'Nhập số phút hợp lệ' }]}>
                        <InputNumber style={{ width: '100%' }} min={1} />
                    </Form.Item>
                    <Form.Item name="movieActors" label="Actors" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="movieDirector" label="Direction" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="ageRating" label="Age Rating" rules={[{ required: true }]}>
                        <Select options={ageRatingOptions} placeholder="Choose age rating..." />
                    </Form.Item>
                    <Form.Item label="Movie Showing" name="movieShowing">
                        <div>
                            <Button type='dashed' style={{color: '#9CEE69', borderColor: '#9CEE69'}} onClick={handleAddOrEditShowing}>
                                {showing ? "Edit Showing" : "Add Showing"}
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
                                            <b>Start Date:</b> {showing.startDate}
                                        </div>
                                        <div>
                                            <b>End Date:</b> {showing.endDate}
                                        </div>
                                    </Card>
                                </div>
                            )}
                        </div>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Add Movie</Button>
                    </Form.Item>
                </Form>
            </div>
            <Modal
                title="Movie Showing"
                open={showingModalOpen}
                onOk={handleShowingOk}
                onCancel={() => setShowingModalOpen(false)}
                destroyOnClose
                footer={
                    <Flex justify="end" gap={8}>
                        <Button style={{color: '#b7b7b7'}} onClick={() => setShowingModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="primary" onClick={handleShowingOk}>
                            Save
                        </Button>
                    </Flex>
                }
            >
                <Form form={showingForm} layout="vertical">
                    <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="startDate" label="Start Date" rules={[{ required: true }]}>
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="endDate" label="End Date" rules={[{ required: true }]}>
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                </Form>
            </Modal>
        </ConfigProvider>
    );
}