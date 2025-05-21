import React, {useState} from "react";
import {Card, Flex} from "antd";
import { FaStar } from "react-icons/fa";
import { Typography } from 'antd';
import './MovieCard.css'
import {useNavigate} from "react-router-dom";

const { Text } = Typography;

export default function MovieCard({movie, type}) {
    const [genres, setGenres] = useState(
        movie.genres.map(item => item.name).join(', ')
    )

    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(`/movie/${movie.id}`);
    }

    return (
        <Card style={{ backgroundColor: 'transparent', borderColor: 'transparent'}}>
            <Flex vertical gap={5}>
                <div className="image-container">
                    <div className={`age-badge age-${movie.ageRating}`}>{movie.ageRating}</div>
                    <img className="zoom-inside" src={movie.moviePoster} alt="Sample Movie" onClick={handleNavigate}/>
                </div>

                <Flex vertical gap={2}>
                    <Text className="title" ellipsis={{ tooltip: true }} style={{color: type === "BIG" ? "#fff" : "#000", width: 200, fontSize: 16, fontWeight: 'bold', cursor: "pointer"}} onClick={handleNavigate}>
                        {movie.movieName}
                    </Text>

                    <span style={{color: "#A69BA2"}}>{genres}</span>

                    {movie.movieRating !== '0.0' && movie.movieRating
                        ?
                        <Flex gap={3} align={'center'}>
                            <FaStar style={{color: "yellow"}} />
                            <span style={{color: type === "BIG" ? "#fff" : "#000"}}>{movie.movieRating}</span>
                        </Flex>
                        :
                        <div/>
                    }


                </Flex>
            </Flex>
        </Card>
    )
}