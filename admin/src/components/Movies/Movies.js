import React, {useEffect, useState} from 'react';
import {Table, Image, Tag, ConfigProvider, Button} from 'antd';
import {useNavigate} from "react-router";
import {getAllMovies} from "../../services/MovieService";

const sampleMovies = [
    {
        key: '1',
        image: 'https://image.tmdb.org/t/p/w500/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg',
        title: 'Inception',
        release: '2010-07-16',
        ageRating: '16+',
        rating: 4.8,
    },
    {
        key: '2',
        image: 'https://image.tmdb.org/t/p/w500/6KErczPBROQty7QoIsaa6wJYXZi.jpg',
        title: 'Interstellar',
        release: '2014-11-07',
        ageRating: '13+',
        rating: 4.7,
    },
    {
        key: '3',
        image: 'https://image.tmdb.org/t/p/w500/9O1Iy9od7uGg1Q1h1d1t8A1tLQv.jpg',
        title: 'The Dark Knight',
        release: '2008-07-18',
        ageRating: 'P',
        rating: 4.9,
    },
    {
        key: '4',
        image: 'https://image.tmdb.org/t/p/w500/5KCVkau1HEl7ZzfPsKAPM0sMiKc.jpg',
        title: 'Avengers: Endgame',
        release: '2019-04-26',
        ageRating: '13+',
        rating: 4.6,
    },
    {
        key: '5',
        image: 'https://image.tmdb.org/t/p/w500/6agKYU5IQFpuDyUYPu39w7UCRrJ.jpg',
        title: 'Parasite',
        release: '2019-05-30',
        ageRating: '16+',
        rating: 4.5,
    }
];

const ageRatingColors={
    "P": "#4CAF50",
    "13+": "#FFA500",
    "16+": "#FF8C00",
    "18+": "#FF3B30"
}

const columns = [
    {
        title: 'Image',
        dataIndex: 'moviePoster',
        key: 'moviePoster',
        render: (img) => <Image width={60} src={img} />,
    },
    {
        title: 'Title',
        dataIndex: 'movieName',
        key: 'movieName',
    },
    {
        title: 'Release Date',
        dataIndex: 'movieRelease',
        key: 'movieRelease',
    },
    {
        title: 'Age Rating',
        dataIndex: 'ageRating',
        key: 'ageRating',
        render: (age) => <Tag color={ageRatingColors[age] || 'default'}>{age}</Tag>,
    },
    {
        title: 'Rating',
        dataIndex: 'movieRating',
        key: 'movieRating',
    },
];

export default function Movies() {
    const [pagination, setPagination] = useState({ current: 1, pageSize: 3 });
    const navigate = useNavigate();
    const [movies, setMovies] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalElements, setTotalElements] = useState(0);

    useEffect(() => {
        fetchMovies(currentPage, pageSize);
    }, [currentPage, pageSize]);

    const fetchMovies = async (page, limit) => {
        try {
            const res = await getAllMovies({
                page,
                limit,
            });
            setMovies(res.data);
            setTotalElements(res.totalElements);
        } catch (err) {
            setMovies([]);
            setTotalElements(0);
        }
    };

    const handleTableChange = (pagination) => {
        setCurrentPage(pagination.current);
        setPageSize(pagination.pageSize);
    };

    return (
        <ConfigProvider
            theme={{
                components: {
                    Table: { colorPrimary: "#6cc832" },
                    Pagination: { colorPrimary: "#6cc832" },
                    Button: {
                        colorPrimary: "#9cee69",
                        colorPrimaryHover: "#85D94F",
                        colorText: "#fff",
                        fontWeight: 600,
                        colorPrimaryActive: "#85D94F",
                        primaryShadow: "0 0px 0 #9cee69",
                    },
                }
            }}
        >
            <div style={{ padding: 32 }}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <h2>Quản lý phim</h2>
                    <Button type="primary" onClick={() => navigate('/movies/add')}>Thêm phim</Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={movies}
                    rowKey="id"
                    pagination={{
                        current: currentPage,
                        pageSize: pageSize,
                        total: totalElements,
                    }}
                    onChange={handleTableChange}
                    onRow={(record) => ({
                        onClick: () => navigate(`/movies/${record.id}`)
                    })}
                    style={{ cursor: 'pointer' }}
                />
            </div>
        </ConfigProvider>
    );
}