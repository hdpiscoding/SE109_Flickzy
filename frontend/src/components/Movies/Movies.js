import React, {useEffect, useState} from "react";
import './Movie.css'
import MovieCarousel from "./Carousel/MovieCarousel";
import {Flex, Select, Input, Col, Row, Pagination} from "antd";
import MovieCard from "./Card/MovieCard";
import {getAllGenres, getAllMovies} from "../../services/MovieService";

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
    const [movies, setMovies] = React.useState([]);
    const [showingMovies, setShowingMovies] = React.useState([]);
    const [genreList, setGenreList] = React.useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalElements, setTotalElements] = useState(0);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        genres: undefined,
        yearRelease: undefined,
        name: undefined,
    });

    useEffect(() => {
        // Fetch genres
        getAllGenres()
            .then((data) => setGenreList(data))
            .catch((err) => console.error("Error fetching genres:", err));
        // // Fetch showing movies
        // getAllMovies({ page: 1, limit: 10, isShowing: true })
        //     .then((data) => setShowingMovies(data.data || []))
        //     .catch((err) => console.error("Error fetching showing movies:", err));
    }, []);

    useEffect(() => {
        fetchMovies(currentPage, pageSize, filters);
    }, [currentPage, pageSize, filters]);

    const fetchMovies = async (page, limit, filterObj) => {
        setLoading(true);
        try {
            const res = await getAllMovies({
                page,
                limit,
                genres: filterObj.genres,
                yearRelease: filterObj.yearRelease,
                name: filterObj.name,
            });
            setMovies(res.data);
            setTotalElements(res.totalElements);
        } catch (err) {
            setMovies([]);
            setTotalElements(0);
        } finally {
            setLoading(false);
        }
    };

    const genreOptions = genreList.map((genre) => ({
        value: genre.id,
        label: genre.name,
    }));

    const [transitionState, setTransitionState] = React.useState("fadeIn");
    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
        setTransitionState("fadeOut");
        setTimeout(() => {
            setCurrentPage(page);
            setPageSize(pageSize);
            setTransitionState("fadeIn");
        }, 200);
    };

    const handleGenreChange = (value) => {
        setFilters((prev) => ({
            ...prev,
            genres: value,
        }));
        setCurrentPage(1);
    }

    const handleYearChange = (value, label) => {
        setFilters((prev) => ({
            ...prev,
            yearRelease: value,
        }));
        setCurrentPage(1);
    }

    const onSearch = (value) => {
        setFilters((prev) => ({
            ...prev,
            name: value,
        }));
        setCurrentPage(1);
    }

    return (
        <>
            <Flex vertical>
                <div className="background-container">
                    <div className="overlay" />

                    <div className="content">
                        <div style={{textAlign: "center", fontWeight: "bold"}}>
                          <h1>Showing Movies</h1>
                        </div>

                        <div style={{margin: "0 100px"}}>
                            <MovieCarousel movieList={movies} />
                        </div>
                    </div>
                </div>

                <div style={{backgroundColor: "#faf9fa", display: "flex", flexDirection: "column"}}>
                    <div style={{marginLeft: "clamp(16px, 10%, 230px)", marginRight: "clamp(16px, 10%, 230px)", marginTop: "100px", display: "flex", flexDirection: "column"}}>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <span style={{color: '#333', fontWeight: "bold", fontSize: 20}}>Find movies on Flickzy</span>

                            <Flex gap={20}>
                                <Select placeholder="Genre" options={genreOptions} style={{width:'100px'}} onChange={handleGenreChange} allowClear/>

                                <Select placeholder="Year" options={yearList} style={{width:'100px'}} onChange={handleYearChange} allowClear/>

                                <Input.Search placeholder="Movie name..." onSearch={onSearch} enterButton allowClear/>
                            </Flex>
                        </div>

                        <div className="movie-grid" key={currentPage}>
                            {movies?.map((movie) => (
                                <div className={`movie-grid-item ${transitionState}`} key={movie.id}>
                                    <MovieCard movie={movie} type="MEDIUM" />
                                </div>
                            ))}
                        </div>

                        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", marginBottom: "20px" }}>
                            <Pagination
                                current={currentPage}
                                pageSize={pageSize}
                                total={totalElements}
                                onChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </Flex>
        </>
    );
}
