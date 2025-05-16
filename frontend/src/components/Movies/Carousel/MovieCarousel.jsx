import React from 'react';
import { Carousel, Row, Col, Grid } from 'antd';
import './MovieCarousel.css';
import MovieCard from "../Card/MovieCard";

const { useBreakpoint } = Grid;

const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
};

export default function MovieCarousel({ movieList = [] }) {
    const screens = useBreakpoint();

    const cardsPerSlide = 5;
    const groupedMovies = chunkArray(movieList, cardsPerSlide);

    return screens.xl ? (
        <Carousel dots arrows>
            {groupedMovies.map((group, index) => (
                <div key={index}>
                    <Row gutter={[16, 16]} justify="center">
                        {group.map((movie, idx) => (
                            <Col key={idx} xs={24} sm={12} md={8} lg={6} xl={4}>
                                <MovieCard type={"BIG"} key={idx} movie={movie} />
                            </Col>
                        ))}
                    </Row>
                </div>
            ))}
        </Carousel>
    ) : (
        <div className="horizontal-scroll-wrapper">
            {movieList.map((movie, idx) => (
                <div className="scroll-card" key={idx}>
                    <MovieCard type={"BIG"} key={idx} movie={movie} />
                </div>
            ))}
        </div>
    );
}