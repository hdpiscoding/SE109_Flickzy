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
            <Button onClick={() => navigate('/movies')} style={{ marginBottom: 16 }}>Back</Button>
            <div style={{display: 'flex', justifyContent: 'end', marginBottom: 16}}>
                <Button type="primary" onClick={() => navigate(`/movies/${movieId}/edit`)}>Edit movie</Button>
            </div>
            <Card
                title={movie.movieName}
                bordered={false}
            >
                <Descriptions column={1} bordered>
                    <Descriptions.Item label="Description">{movie.movieDescription}</Descriptions.Item>
                    <Descriptions.Item label="Content">{movie.movieContent}</Descriptions.Item>
                    <Descriptions.Item label="Release Date">{movie.movieRelease}</Descriptions.Item>
                    <Descriptions.Item label="Age Rating">
                        <Tag color={ageRatingColors[movie.ageRating] || 'default'}>{movie.ageRating}</Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Ratings">{movie.movieRating}</Descriptions.Item>
                    <Descriptions.Item label="Nation">{movie.movieNation}</Descriptions.Item>
                    <Descriptions.Item label="Duration">{movie.movieLength} phút</Descriptions.Item>
                    <Descriptions.Item label="Actors">{movie.movieActors}</Descriptions.Item>
                    <Descriptions.Item label="Director">{movie.movieDirector}</Descriptions.Item>
                    <Descriptions.Item label="Genres">{genresToString(movie.genres)}</Descriptions.Item>
                    <Descriptions.Item label="Poster">
                        <Image src={movie.moviePoster} width={120} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Background">
                        <Image src={movie.movieBackground} width={250} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Trailer">
                        <a href={movie.movieTrailer} target="_blank" rel="noopener noreferrer">{movie.movieTrailer}</a>
                    </Descriptions.Item>
                    <Descriptions.Item label="Showing Info">
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
                                                <b>Start Date:</b> {showing.startDate}
                                            </div>
                                            <div>
                                                <b>End Date:</b> {showing.endDate}
                                            </div>
                                        </Card>
                                    );
                                })}
                            </div>
                        ) : (
                            "No showing info"
                        )}
                    </Descriptions.Item>
                </Descriptions>
            </Card>
        </div>
    );
}