import React, { useEffect } from 'react';
import { Form, Input, Button, Select, DatePicker, ConfigProvider, message } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const genreOptions = [
    { value: 1, label: "Action" },
    { value: 2, label: "Horror" },
    { value: 3, label: "Romance" },
    { value: 4, label: "Thriller" },
    { value: 5, label: "Comedy" },
    { value: 6, label: "Sci-Fi" }
];

const ageRatingOptions = [
    { value: 'P', label: 'P' },
    { value: '13+', label: '13+' },
    { value: '16+', label: '16+' },
    { value: '18+', label: '18+' }
];

const sampleMovies = [
    {
        key: '1',
        image: 'https://image.tmdb.org/t/p/w500/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg',
        title: 'Inception',
        release: '2010-07-16',
        ageRating: '16+',
        rating: 4.8,
        description: 'A mind-bending thriller.',
        content: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.',
        nation: 'USA',
        length: 148,
        actors: 'Leonardo DiCaprio, Joseph Gordon-Levitt',
        director: 'Christopher Nolan',
        genres: ['Action', 'Sci-Fi'],
        poster: 'https://image.tmdb.org/t/p/w500/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg',
        trailer: 'https://youtube.com/inception'
    },
];

export default function EditMovie() {
    // const { id } = useParams();
    // const navigate = useNavigate();
    const [form] = Form.useForm();
    // const movie = sampleMovies.find(m => m.key === id);
    const [movie, setMovie] = React.useState(sampleMovies[0]);

    useEffect(() => {
        if (movie) {
            form.setFieldsValue({
                movieName: movie.title,
                movieDescription: movie.description,
                movieContent: movie.content,
                movieTrailer: movie.trailer,
                genres: movie.genres,
                movieRelease: dayjs(movie.release),
                moviePoster: movie.poster,
                movieNation: movie.nation,
                movieLength: movie.length,
                movieActors: movie.actors,
                movieDirector: movie.director,
                ageRating: movie.ageRating,
            });
        }
    }, [movie, form]);

    const onFinish = (values) => {
        // Handle update logic here
        message.success('Movie updated!');
        navigate(-1);
    };

    if (!movie) return <div>Movie not found</div>;

    return (
        <ConfigProvider theme={{
            components: {
                Input: { activeBorderColor: '#9CEE69', hoverBorderColor: '#9CEE69' },
                Button: { colorPrimary: "#9cee69", colorPrimaryHover: "#85D94F", colorText: "#fff", fontWeight: 600, colorPrimaryActive: "#85D94F" },
                Select: { colorPrimary: "#9cee69", colorPrimaryHover: "#85D94F", colorPrimaryActive: "#85D94F" },
                DatePicker: { colorPrimary: "#9cee69", colorPrimaryHover: "#85D94F", colorPrimaryActive: "#85D94F" }
            }
        }}>
            <div style={{display: 'grid', gridTemplateColumns: '1.5fr 9fr 1.5fr'}}>
                <div style={{ gridColumnStart: 2, marginTop: '100px', background: '#fff', padding: 32, borderRadius: 8 }}>
                    <h2>Edit movie</h2>
                    <Form form={form} layout="vertical" onFinish={onFinish}>
                        {/* Same fields as AddMovie */}
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
                            <Select mode="multiple" options={genreOptions} placeholder="Choose genre..." />
                        </Form.Item>
                        <Form.Item name="movieRelease" label="Release Date" rules={[{ required: true }]}>
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item name="moviePoster" label="Poster (URL)" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="movieNation" label="Nation" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="movieLength" label="Duration (min)" rules={[{ required: true, type: 'number', min: 1, message: 'Nhập số phút hợp lệ' }]}>
                            <Input type="number" />
                        </Form.Item>
                        <Form.Item name="movieActors" label="Actors" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="movieDirector" label="Director" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="ageRating" label="Age Rating" rules={[{ required: true }]}>
                            <Select options={ageRatingOptions} placeholder="Choose age rating..." />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Save</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </ConfigProvider>
    );
}