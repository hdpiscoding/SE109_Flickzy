import React from 'react';
import { Card, Image, Tag, Descriptions, Button } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';

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
    // ...other movies
];

const ageRatingColors = {
    "P": "#4CAF50",
    "13+": "#FFA500",
    "16+": "#FF8C00",
    "18+": "#FF3B30"
};

export default function MovieDetail() {
    // const { id } = useParams();
    // const navigate = useNavigate();
    // const movie = sampleMovies.find(m => m.key === id);
    //
    // if (!movie) return <div>Movie not found</div>;
    const [movie, setMovie] = React.useState(sampleMovies[0]);

    return (
        <div style={{display: 'grid', gridTemplateColumns: '1.5fr 9fr 1.5fr'}}>
            <div style={{ marginTop: '100px', gridColumnStart: 2 }}>
                <Button onClick={() => navigate(-1)} style={{ marginBottom: 16 }}>Back</Button>
                <Card
                    title={movie.title}
                    bordered={false}
                >
                    <Descriptions column={1} bordered>
                        <Descriptions.Item label="Description">{movie.description}</Descriptions.Item>
                        <Descriptions.Item label="Content">{movie.content}</Descriptions.Item>
                        <Descriptions.Item label="Release Date">{movie.release}</Descriptions.Item>
                        <Descriptions.Item label="Age Rating">
                            <Tag color={ageRatingColors[movie.ageRating] || 'default'}>{movie.ageRating}</Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label="Ratings">{movie.rating}</Descriptions.Item>
                        <Descriptions.Item label="Nation">{movie.nation}</Descriptions.Item>
                        <Descriptions.Item label="Duration">{movie.length} phút</Descriptions.Item>
                        <Descriptions.Item label="Actors">{movie.actors}</Descriptions.Item>
                        <Descriptions.Item label="Director">{movie.director}</Descriptions.Item>
                        <Descriptions.Item label="Genres">{movie.genres.join(', ')}</Descriptions.Item>
                        <Descriptions.Item label="Poster">
                            <Image src={movie.poster} width={120} />
                        </Descriptions.Item>
                        <Descriptions.Item label="Trailer">
                            <a href={movie.trailer} target="_blank" rel="noopener noreferrer">{movie.trailer}</a>
                        </Descriptions.Item>
                    </Descriptions>
                </Card>
            </div>
        </div>
    );
}