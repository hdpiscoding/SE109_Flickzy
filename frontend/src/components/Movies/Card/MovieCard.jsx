import React, {useState} from "react";
import {Card, Flex} from "antd";
import { FaStar } from "react-icons/fa";
import { Typography } from 'antd';
const { Text } = Typography;
import './MovieCard.css'


const sampleMovie = {
    title: "Sample Movie jaldfjladjlksajdklajdlkajdlkasjklajlkakassjk",
    genres: [
        {
            id: "1",
            name: "Action"
        },
        {
            id: "2",
            name: "Drama"
        }
    ],
    imageUrl: "https://cinema.momocdn.net/img/77368526851200910-kien.jpg?size=M",
    rating: 5.0
}

export default function MovieCard({movie, type}) {
    const [genres, setGenres] = useState(
        movie.genres.map(item => item.name).join(', ')
    )

    return (
        <Card style={{ backgroundColor: 'transparent', borderColor: 'transparent'}}>
            <Flex vertical gap={5}>
                <div className="image-container">
                    <div className={`age-badge age-${movie.ageRating}`}>{movie.ageRating}</div>
                    <img className="zoom-inside" src={sampleMovie.imageUrl} alt="Sample Movie"/>
                </div>

                <Flex vertical gap={2}>
                    <Text className="title" ellipsis={{ tooltip: true }} style={{color: type === "BIG" ? "#fff" : "#000", width: 200, fontSize: 16, fontWeight: 'bold', cursor: "pointer"}}>
                        {movie.title}
                    </Text>

                    <span style={{color: "#A69BA2"}}>{genres}</span>

                    <Flex gap={3} align={'center'}>
                        <FaStar style={{color: "yellow"}} />

                        <span style={{color: type === "BIG" ? "#fff" : "#000"}}>{movie.rating}</span>
                    </Flex>

                </Flex>
            </Flex>
        </Card>
    )
}