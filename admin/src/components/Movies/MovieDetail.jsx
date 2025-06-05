import React, {useEffect} from 'react';
import { Card, Image, Tag, Descriptions, Button } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import {getMovieDetail, getMovieShowing} from "../../services/MovieService";

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
        trailer: 'https://youtube.com/inception',
        showings: [
            {
                name: "Spring Premiere",
                startDate: "2024-07-01",
                endDate: "2024-07-15"
            },
            {
                name: "Summer Blockbuster",
                startDate: "2024-08-01",
                endDate: "2024-08-10"
            },
            {
                name: "Fall Special",
                startDate: "2025-04-01",
                endDate: "2025-09-30"
            }
        ]
    },
    // ...other movies
];

const ageRatingColors = {
    "P": "#4CAF50",
    "13+": "#FFA500",
    "16+": "#FF8C00",
    "18+": "#FF3B30"
};

const isExpired = (endDate) => {
    return new Date(endDate) < new Date();
};

function genresToString(genres) {
    return genres?.map(g => g.name).join(', ');
}

export default function MovieDetail() {
    const { movieId } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = React.useState(sampleMovies[0]);
    const [movieShowings, setMovieShowings] = React.useState([]);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [movieDetail, movieShowing] = await Promise.all([
                getMovieDetail(movieId),
                getMovieShowing(movieId)
            ]);
            setMovie(movieDetail);
            setMovieShowings(movieShowing);
        }
        catch (error) {
            console.error("Error fetching movie details:", error);
        }
    }

    return (
        <div style={{ marginTop: '10px' }}>
            <Button onClick={() => navigate('/movies')} style={{ marginBottom: 16 }}>Quay lại</Button>
            <div style={{display: 'flex', justifyContent: 'end', marginBottom: 16}}>
                <Button type="primary" onClick={() => navigate(`/movies/${movieId}/edit`)}>Chỉnh sửa phim</Button>
            </div>
            <Card
                title={movie.movieName}
                bordered={false}
            >
                <Descriptions column={1} bordered>
                    <Descriptions.Item label="Mô tả">{movie.movieDescription}</Descriptions.Item>
                    <Descriptions.Item label="Nội dung">{movie.movieContent}</Descriptions.Item>
                    <Descriptions.Item label="Ngày khởi chiếu">{movie.movieRelease}</Descriptions.Item>
                    <Descriptions.Item label="Phân loại độ tuổi">
                        <Tag color={ageRatingColors[movie.ageRating] || 'default'}>{movie.ageRating}</Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Đánh giá">{movie.movieRating}</Descriptions.Item>
                    <Descriptions.Item label="Quốc gia">{movie.movieNation}</Descriptions.Item>
                    <Descriptions.Item label="Thời lượng">{movie.movieLength} phút</Descriptions.Item>
                    <Descriptions.Item label="Diễn viên">{movie.movieActors}</Descriptions.Item>
                    <Descriptions.Item label="Đạo diễn">{movie.movieDirector}</Descriptions.Item>
                    <Descriptions.Item label="Thể loại">{genresToString(movie.genres)}</Descriptions.Item>
                    <Descriptions.Item label="Poster">
                        <Image src={movie.moviePoster} width={120} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Ảnh nền">
                        <Image src={movie.movieBackground} width={250} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Trailer">
                        <a href={movie.movieTrailer} target="_blank" rel="noopener noreferrer">{movie.movieTrailer}</a>
                    </Descriptions.Item>
                    <Descriptions.Item label="Thông tin suất chiếu">
                        {movieShowings && movieShowings?.length > 0 ? (
                            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                                {movieShowings?.map((showing, idx) => {
                                    const expired = isExpired(showing.endDate);
                                    return (
                                        <Card
                                            key={idx}
                                            size="small"
                                            title={showing.name}
                                            bordered={true}
                                            style={{
                                                background: expired ? "#f0f0f0" : "#f6ffed",
                                                borderColor: expired ? "#d9d9d9" : "#b7eb8f",
                                                minWidth: 200,
                                                opacity: expired ? 0.5 : 1,
                                                color: expired ? "#888" : "inherit"
                                            }}
                                        >
                                            <div>
                                                <b>Ngày bắt đầu:</b> {showing.startDate}
                                            </div>
                                            <div>
                                                <b>Ngày kết thúc:</b> {showing.endDate}
                                            </div>
                                        </Card>
                                    );
                                })}
                            </div>
                        ) : (
                            "Chưa có thông tin suất chiếu"
                        )}
                    </Descriptions.Item>
                </Descriptions>
            </Card>
        </div>
    );
}