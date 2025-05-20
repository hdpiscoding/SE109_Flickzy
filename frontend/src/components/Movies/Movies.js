import React from "react";
import './Movie.css'
import MovieCarousel from "./Carousel/MovieCarousel";
import {Flex, Select, Input, Col, Row, Pagination} from "antd";
import MovieCard from "./Card/MovieCard";

const movieList = [
    {
        title: "Disaster Squad",
        genres: [{ id: 1, name: "Action" }, { id: 4, name: "Thriller" }],
        imageUrl: "https://via.placeholder.com/220x300?text=Disaster+Squad",
        rating: 4.2,
        ageRating: "16+"
    },
    {
        title: "Love Fails",
        genres: [{ id: 3, name: "Romance" }],
        imageUrl: "https://via.placeholder.com/220x300?text=Love+Fails",
        rating: 3.8,
        ageRating: "13+"
    },
    {
        title: "Haunted Subway",
        genres: [{ id: 2, name: "Horror" }],
        imageUrl: "https://via.placeholder.com/220x300?text=Haunted+Subway",
        rating: 5.0,
        ageRating: "18+"
    },
    {
        title: "Robot Trouble",
        genres: [{ id: 1, name: "Action" }, { id: 6, name: "Sci-Fi" }],
        imageUrl: "https://via.placeholder.com/220x300?text=Robot+Trouble",
        rating: 4.5,
        ageRating: "13+"
    },
    {
        title: "The Lost Banana",
        genres: [{ id: 5, name: "Comedy" }],
        imageUrl: "https://via.placeholder.com/220x300?text=Lost+Banana",
        rating: 2.9,
        ageRating: "P"
    },
    {
        title: "Ghosting Grandma",
        genres: [{ id: 2, name: "Horror" }, { id: 5, name: "Comedy" }],
        imageUrl: "https://via.placeholder.com/220x300?text=Ghosting+Grandma",
        rating: 3.2,
        ageRating: "16+"
    },
    {
        title: "Apocalypse Noodle",
        genres: [{ id: 1, name: "Action" }, { id: 6, name: "Sci-Fi" }],
        imageUrl: "https://via.placeholder.com/220x300?text=Apocalypse+Noodle",
        rating: 4.7,
        ageRating: "16+"
    },
    {
        title: "Love Calculator",
        genres: [{ id: 3, name: "Romance" }],
        imageUrl: "https://via.placeholder.com/220x300?text=Love+Calculator",
        rating: 4.0,
        ageRating: "13+"
    },
    {
        title: "Midnight Clown",
        genres: [{ id: 2, name: "Horror" }],
        imageUrl: "https://via.placeholder.com/220x300?text=Midnight+Clown",
        rating: 3.5,
        ageRating: "18+"
    },
    {
        title: "Boring Life",
        genres: [{ id: 5, name: "Comedy" }, { id: 3, name: "Romance" }],
        imageUrl: "https://via.placeholder.com/220x300?text=Boring+Life",
        rating: 2.4,
        ageRating: "P"
    }
];


const genreList = [
    { id: 1, name: "Action" },
    { id: 2, name: "Horror" },
    { id: 3, name: "Romance" },
    { id: 4, name: "Thriller" },
    { id: 5, name: "Comedy" },
    { id: 6, name: "Sci-Fi" }
];

const yearList = [
    {value: 2025, label: "2025"},
    {value: 2024, label: "2024"},
    {value: 2023, label: "2023"},
    {value: 2022, label: "2022"},
    {value: 2021, label: "2021"},
    {value: 2020, label: "2020"},
    {value: 2019, label: "2019"},
    {value: 2018, label: "2018"},
]


export default function Movies() {
    const [genre, setGenre] = React.useState(genreList.map((genre) => {
        return {
            value: genre.id,
            label: genre.name
        }
    }));

    const [currentPage, setCurrentPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(5);
    const [transitionState, setTransitionState] = React.useState("fadeIn");
    const handlePageChange = (page, pageSize) => {
        setTransitionState("fadeOut");
        setTimeout(() => {
            setCurrentPage(page);
            setPageSize(pageSize);
            setTransitionState("fadeIn");
        }, 200);
    };
    const startIndex = (currentPage - 1) * pageSize;
    const currentMovies = movieList.slice(startIndex, startIndex + pageSize);

    const handleGenreChange = (value, label) => {
        console.log(value, label.label);
    }

    const handleYearChange = (value, label) => {
        console.log(value, label.label);
    }

    const onSearch = (value) => {
        console.log(value);
    }

    return (
        <>
            <Flex vertical>
                <div className="background-container">
                    <div className="overlay" />

                    <div className="content">
                        <div style={{textAlign: "center", fontWeight: "bold"}}>
                          <h1>Phim đang chiếu</h1>
                        </div>

                        <div style={{margin: "0 100px"}}>
                            <MovieCarousel movieList={movieList} />
                        </div>
                    </div>
                </div>

                <div style={{backgroundColor: "#faf9fa", display: "flex", flexDirection: "column"}}>
                    <div style={{marginLeft: "clamp(16px, 10%, 230px)", marginRight: "clamp(16px, 10%, 230px)", marginTop: "100px", display: "flex", flexDirection: "column"}}>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <span style={{color: '#333', fontWeight: "bold", fontSize: 20}}>Tìm kiếm phim chiếu rạp trên Flickzy</span>

                            <Flex gap={20}>
                                <Select placeholder="Thể loại" options={genre} style={{width:'100px'}} onChange={handleGenreChange}/>

                                <Select placeholder="Năm" options={yearList} style={{width:'100px'}} onChange={handleYearChange}/>

                                <Input.Search placeholder="Tên phim" onSearch={onSearch} enterButton/>
                            </Flex>
                        </div>

                        <div className="movie-grid" key={currentPage}>
                            {currentMovies.map((movie, idx) => (
                                <div className={`movie-grid-item ${transitionState}`} key={idx}>
                                    <MovieCard movie={movie} type="MEDIUM" />
                                </div>
                            ))}
                        </div>

                        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", marginBottom: "20px" }}>
                            <Pagination
                                current={currentPage}
                                pageSize={pageSize}
                                total={movieList.length}
                                onChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </Flex>
        </>
    );
}
