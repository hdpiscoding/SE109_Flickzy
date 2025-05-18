import React, {useEffect, useState} from 'react';
import {Flex, Tooltip, Button, Modal, ConfigProvider, Select, Carousel, Collapse, Divider, Pagination} from "antd";
import './Movie.css'
import MovieTrailer from "./MovieTrailer";
import DateCard from "./Card/DateCard";
import CinemaCard from "./Card/CinemaCard";
import ScheduleCard from "./Card/ScheduleCard";
import ReviewCard from "./Card/ReviewCard";
import { AiFillStar } from "react-icons/ai";
import MovieHorizontalCard from "./Card/MovieHorizontalCard";
import ReviewInput from "./ReviewInput";

export const vietnamProvinces = [
    { value: "Hà Nội", label: "Hà Nội" },
    { value: "Hồ Chí Minh", label: "Hồ Chí Minh" },
    { value: "Hải Phòng", label: "Hải Phòng" },
    { value: "Đà Nẵng", label: "Đà Nẵng" },
    { value: "Cần Thơ", label: "Cần Thơ" },
    { value: "An Giang", label: "An Giang" },
    { value: "Bà Rịa - Vũng Tàu", label: "Bà Rịa - Vũng Tàu" },
    { value: "Bắc Giang", label: "Bắc Giang" },
    { value: "Bắc Kạn", label: "Bắc Kạn" },
    { value: "Bạc Liêu", label: "Bạc Liêu" },
    { value: "Bắc Ninh", label: "Bắc Ninh" },
    { value: "Bến Tre", label: "Bến Tre" },
    { value: "Bình Định", label: "Bình Định" },
    { value: "Bình Dương", label: "Bình Dương" },
    { value: "Bình Phước", label: "Bình Phước" },
    { value: "Bình Thuận", label: "Bình Thuận" },
    { value: "Cà Mau", label: "Cà Mau" },
    { value: "Cao Bằng", label: "Cao Bằng" },
    { value: "Đắk Lắk", label: "Đắk Lắk" },
    { value: "Đắk Nông", label: "Đắk Nông" },
    { value: "Điện Biên", label: "Điện Biên" },
    { value: "Đồng Nai", label: "Đồng Nai" },
    { value: "Đồng Tháp", label: "Đồng Tháp" },
    { value: "Gia Lai", label: "Gia Lai" },
    { value: "Hà Giang", label: "Hà Giang" },
    { value: "Hà Nam", label: "Hà Nam" },
    { value: "Hà Tĩnh", label: "Hà Tĩnh" },
    { value: "Hải Dương", label: "Hải Dương" },
    { value: "Hậu Giang", label: "Hậu Giang" },
    { value: "Hòa Bình", label: "Hòa Bình" },
    { value: "Hưng Yên", label: "Hưng Yên" },
    { value: "Khánh Hòa", label: "Khánh Hòa" },
    { value: "Kiên Giang", label: "Kiên Giang" },
    { value: "Kon Tum", label: "Kon Tum" },
    { value: "Lai Châu", label: "Lai Châu" },
    { value: "Lâm Đồng", label: "Lâm Đồng" },
    { value: "Lạng Sơn", label: "Lạng Sơn" },
    { value: "Lào Cai", label: "Lào Cai" },
    { value: "Long An", label: "Long An" },
    { value: "Nam Định", label: "Nam Định" },
    { value: "Nghệ An", label: "Nghệ An" },
    { value: "Ninh Bình", label: "Ninh Bình" },
    { value: "Ninh Thuận", label: "Ninh Thuận" },
    { value: "Phú Thọ", label: "Phú Thọ" },
    { value: "Phú Yên", label: "Phú Yên" },
    { value: "Quảng Bình", label: "Quảng Bình" },
    { value: "Quảng Nam", label: "Quảng Nam" },
    { value: "Quảng Ngãi", label: "Quảng Ngãi" },
    { value: "Quảng Ninh", label: "Quảng Ninh" },
    { value: "Quảng Trị", label: "Quảng Trị" },
    { value: "Sóc Trăng", label: "Sóc Trăng" },
    { value: "Sơn La", label: "Sơn La" },
    { value: "Tây Ninh", label: "Tây Ninh" },
    { value: "Thái Bình", label: "Thái Bình" },
    { value: "Thái Nguyên", label: "Thái Nguyên" },
    { value: "Thanh Hóa", label: "Thanh Hóa" },
    { value: "Thừa Thiên Huế", label: "Thừa Thiên Huế" },
    { value: "Tiền Giang", label: "Tiền Giang" },
    { value: "Trà Vinh", label: "Trà Vinh" },
    { value: "Tuyên Quang", label: "Tuyên Quang" },
    { value: "Vĩnh Long", label: "Vĩnh Long" },
    { value: "Vĩnh Phúc", label: "Vĩnh Phúc" },
    { value: "Yên Bái", label: "Yên Bái" }
];

const sampleReviews = [
    {
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        username: 'Nguyen Van A',
        date: '2024-06-01',
        rating: 4.5,
        content: 'Great movie! The plot was engaging and the acting was impressive.',
    },
    {
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        username: 'Tran Thi B',
        date: '2024-06-02',
        rating: 3,
        content: 'The movie was okay, but some scenes felt a bit slow.',
    },
    {
        avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
        username: 'Le Minh C',
        date: '2024-06-03',
        rating: 5,
        content: 'Absolutely loved it! Highly recommend for action lovers.',
    },
    {
        avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
        username: 'Pham Quynh D',
        date: '2024-06-04',
        rating: 2.5,
        content: 'Not my cup of tea. The story was predictable.',
    },
    {
        avatar: 'https://randomuser.me/api/portraits/men/77.jpg',
        username: 'Hoang Van E',
        date: '2024-06-05',
        rating: 4,
        content: 'Good effects and music. Worth watching with friends.',
    },
];


const movie = {
    id: "1",
    movieName: "Cù Lao Xác Sống",
    movieDescription: "Đại dịch zombie đã tới miền Tây!",
    movieContent: "Một cù lao yên bình bỗng một ngày đối diện với sinh tử. Những con người miền Tây sông nước chân chất thật thà sẽ ra sao trước đại dịch kì lạ biến người ta thành… xác sống? Hãy chờ xem những bất ngờ tiếp theo từ phim nhé!",
    movieTrailer: "https://www.youtube.com/watch?v=_VcQTQVackE",
    genres: [
        { id: 1, name: "Hành động" },
        { id: 2, name: "Kinh dị" }
    ],
    movieRelease: "2023-10-20",
    moviePoster: "https://cinema.momocdn.net/img/80187360509592732-1.jpg",
    movieNation: "Việt Nam",
    movieLength: 120,
    movieDirector: "Nguyễn Hữu Hoàng",
    movieActors: "Huỳnh Đông, Ốc Thanh Vân, Trần Phong",
    movieRating: 2.5,
    ageRating: "18+"
}

const sampleMovies = [
    {
        image: 'https://image.tmdb.org/t/p/w500/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg',
        title: 'Inception',
        genres: [
            { id: 1, name: 'Action' },
            { id: 2, name: 'Sci-Fi' }
        ],
        rating: 4.8,
        ageRating: '16+'
    },
    {
        image: 'https://image.tmdb.org/t/p/w500/6KErczPBROQty7QoIsaa6wJYXZi.jpg',
        title: 'Interstellar',
        genres: [
            { id: 2, name: 'Sci-Fi' },
            { id: 3, name: 'Drama' }
        ],
        rating: 4.7,
        ageRating: '13+'
    },
    {
        image: 'https://image.tmdb.org/t/p/w500/9O1Iy9od7uGg1Q1h1d1t8A1tLQv.jpg',
        title: 'The Dark Knight',
        genres: [
            { id: 1, name: 'Action' },
            { id: 4, name: 'Crime' }
        ],
        rating: 4.9,
        ageRating: 'P'
    },
    {
        image: 'https://image.tmdb.org/t/p/w500/5KCVkau1HEl7ZzfPsKAPM0sMiKc.jpg',
        title: 'Avengers: Endgame',
        genres: [
            { id: 1, name: 'Action' },
            { id: 5, name: 'Adventure' }
        ],
        rating: 4.6,
        ageRating: '13+'
    },
    {
        image: 'https://image.tmdb.org/t/p/w500/6agKYU5IQFpuDyUYPu39w7UCRrJ.jpg',
        title: 'Parasite',
        genres: [
            { id: 3, name: 'Drama' },
            { id: 6, name: 'Thriller' }
        ],
        rating: 4.5,
        ageRating: '16+'
    }
];

const cinemaBrands = [
    {id: "1", name: "Tất cả", image: "https://homepage.momocdn.net/next-js/_next/static/public/cinema/dexuat-icon.svg"},
    {id: "2", name: "CGV", image: "https://homepage.momocdn.net/cinema/momo-amazone-s3-api-240829164527-638605467276820522.png"},
    {id: "3", name: "Lotte Cinema", image: "https://homepage.momocdn.net/blogscontents/momo-upload-api-210604170617-637584231772974269.png"},
    {id: "4", name: "Galaxy Cinema", image: "https://homepage.momocdn.net/cinema/momo-upload-api-211123095138-637732578984425272.png"},
    {id: "5", name: "BHD Star", image: "https://homepage.momocdn.net/blogscontents/momo-upload-api-210604170453-637584230934981809.png"},
]

const cinemas = [
    {id: "1", name: "CGV Vincom Đồng Khởi", address: "Tầng 5, Vincom Center, 171 Đ. Đồng Khởi, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh", image: "https://homepage.momocdn.net/cinema/momo-amazone-s3-api-240829164527-638605467276820522.png", schedules: [{id: "1", scheduleStart: "09:00:00", scheduleEnd: "11:00:00"}, {id: "2", scheduleStart: "12:00:00", scheduleEnd: "14:00:00"}, {id: "3", scheduleStart: "15:00:00", scheduleEnd: "17:00:00"}, {id: "4", scheduleStart: "18:00:00", scheduleEnd: "20:00:00"}, {id: "5", scheduleStart: "21:00:00", scheduleEnd: "23:00:00"}, {id: "6", scheduleStart: "00:00:00", scheduleEnd: "02:00:00"}]},
    {id: "2", name: "CGV Vincom Thảo Điền", address: "Tầng 3, Vincom Center Thảo Điền, 161 Đ. Quốc Hương, Thảo Điền, Quận 2, Thành phố Hồ Chí Minh", image: "https://homepage.momocdn.net/cinema/momo-amazone-s3-api-240829164527-638605467276820522.png", schedules: [{id: "1", scheduleStart: "09:00:00", scheduleEnd: "11:00:00"}, {id: "2", scheduleStart: "12:00:00", scheduleEnd: "14:00:00"}, {id: "3", scheduleStart: "15:00:00", scheduleEnd: "17:00:00"}, {id: "4", scheduleStart: "18:00:00", scheduleEnd: "20:00:00"}, {id: "5", scheduleStart: "21:00:00", scheduleEnd: "23:00:00"}, {id: "6", scheduleStart: "00:00:00", scheduleEnd: "02:00:00"}]},
    {id: "3", name: "CGV Crescent Mall", address: "Tầng 3, Crescent Mall, 101 Tôn Dật Tiên, Tân Phú, Quận 7, Thành phố Hồ Chí Minh", image: "https://homepage.momocdn.net/cinema/momo-amazone-s3-api-240829164527-638605467276820522.png", schedules: [{id: "1", scheduleStart: "09:00:00", scheduleEnd: "11:00:00"}, {id: "2", scheduleStart: "12:00:00", scheduleEnd: "14:00:00"}, {id: "3", scheduleStart: "15:00:00", scheduleEnd: "17:00:00"}, {id: "4", scheduleStart: "18:00:00", scheduleEnd: "20:00:00"}, {id: "5", scheduleStart: "21:00:00", scheduleEnd: "23:00:00"}, {id: "6", scheduleStart: "00:00:00", scheduleEnd: "02:00:00"}]},
    {id: "4", name: "CGV Vincom Mega Mall Thảo Điền", address: "Tầng 3, Vincom Mega Mall Thảo Điền, 161 Đ. Quốc Hương, Thảo Điền, Quận 2, Thành phố Hồ Chí Minh", image: "https://homepage.momocdn.net/cinema/momo-amazone-s3-api-240829164527-638605467276820522.png", schedules: [{id: "1", scheduleStart: "09:00:00", scheduleEnd: "11:00:00"}, {id: "2", scheduleStart: "12:00:00", scheduleEnd: "14:00:00"}, {id: "3", scheduleStart: "15:00:00", scheduleEnd: "17:00:00"}, {id: "4", scheduleStart: "18:00:00", scheduleEnd: "20:00:00"}, {id: "5", scheduleStart: "21:00:00", scheduleEnd: "23:00:00"}, {id: "6", scheduleStart: "00:00:00", scheduleEnd: "02:00:00"}]},
    {id: "5", name: "CGV SC VivoCity", address: "Tầng 3, SC VivoCity, 1058 Đ. Nguyễn Văn Linh, Tân Phú, Quận 7, Thành phố Hồ Chí Minh", image: "https://homepage.momocdn.net/cinema/momo-amazone-s3-api-240829164527-638605467276820522.png", schedules: [{id: "1", scheduleStart: "09:00:00", scheduleEnd: "11:00:00"}, {id: "2", scheduleStart: "12:00:00", scheduleEnd: "14:00:00"}, {id: "3", scheduleStart: "15:00:00", scheduleEnd: "17:00:00"}, {id: "4", scheduleStart: "18:00:00", scheduleEnd: "20:00:00"}, {id: "5", scheduleStart: "21:00:00", scheduleEnd: "23:00:00"}, {id: "6", scheduleStart: "00:00:00", scheduleEnd: "02:00:00"}]},
    {id: "6", name: "CGV Vincom Lê Văn Việt", address: "Tầng 4, Vincom Plaza Lê Văn Việt, 50 Đ. Lê Văn Việt, Hiệp Phú, Quận 9, Thành phố Hồ Chí Minh", image: "https://homepage.momocdn.net/cinema/momo-amazone-s3-api-240829164527-638605467276820522.png", schedules: [{id: "1", scheduleStart: "09:00:00", scheduleEnd: "11:00:00"}, {id: "2", scheduleStart: "12:00:00", scheduleEnd: "14:00:00"}, {id: "3", scheduleStart: "15:00:00", scheduleEnd: "17:00:00"}, {id: "4", scheduleStart: "18:00:00", scheduleEnd: "20:00:00"}, {id: "5", scheduleStart: "21:00:00", scheduleEnd: "23:00:00"}, {id: "6", scheduleStart: "00:00:00", scheduleEnd: "02:00:00"}]},
    {id: "7", name: "Galaxy Nguyễn Du", address: "116 Đ. Nguyễn Du, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh", image: "https://homepage.momocdn.net/cinema/momo-upload-api-211123095138-637732578984425272.png", schedules: [{id: "1", scheduleStart: "09:00:00", scheduleEnd: "11:00:00"}, {id: "2", scheduleStart: "12:00:00", scheduleEnd: "14:00:00"}, {id: "3", scheduleStart: "15:00:00", scheduleEnd: "17:00:00"}, {id: "4", scheduleStart: "18:00:00", scheduleEnd: "20:00:00"}, {id: "5", scheduleStart: "21:00:00", scheduleEnd: "23:00:00"}, {id: "6", scheduleStart: "00:00:00", scheduleEnd: "02:00:00"}]},
    {id: "8", name: "Galaxy Tôn Đức Thắng", address: "Tầng 2, 1 Đ. Tôn Đức Thắng, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh", image: "https://homepage.momocdn.net/cinema/momo-upload-api-211123095138-637732578984425272.png", schedules: [{id: "1", scheduleStart: "09:00:00", scheduleEnd: "11:00:00"}, {id: "2", scheduleStart: "12:00:00", scheduleEnd: "14:00:00"}, {id: "3", scheduleStart: "15:00:00", scheduleEnd: "17:00:00"}, {id: "4", scheduleStart: "18:00:00", scheduleEnd: "20:00:00"}, {id: "5", scheduleStart: "21:00:00", scheduleEnd: "23:00:00"}, {id: "6", scheduleStart: "00:00:00", scheduleEnd: "02:00:00"}]},
    {id: "9", name: "Galaxy Phạm Văn Đồng", address: "Tầng 2, Vincom Plaza Phạm Văn Đồng, 1 Đ. Phạm Văn Đồng, Hiệp Bình Chánh, Thủ Đức, Thành phố Hồ Chí Minh", image: "https://homepage.momocdn.net/cinema/momo-upload-api-211123095138-637732578984425272.png", schedules: [{id: "1", scheduleStart: "09:00:00", scheduleEnd: "11:00:00"}, {id: "2", scheduleStart: "12:00:00", scheduleEnd: "14:00:00"}, {id: "3", scheduleStart: "15:00:00", scheduleEnd: "17:00:00"}, {id: "4", scheduleStart: "18:00:00", scheduleEnd: "20:00:00"}, {id: "5", scheduleStart: "21:00:00", scheduleEnd: "23:00:00"}, {id: "6", scheduleStart: "00:00:00", scheduleEnd: "02:00:00"}]},
    {id: "10", name: "Lotte Cinema Diamond Plaza", address: "Tầng 3, Diamond Plaza, 34 Lê Duẩn, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh", image: "https://homepage.momocdn.net/blogscontents/momo-upload-api-210604170617-637584231772974269.png", schedules: [{id: "1", scheduleStart: "09:00:00", scheduleEnd: "11:00:00"}, {id: "2", scheduleStart: "12:00:00", scheduleEnd: "14:00:00"}, {id: "3", scheduleStart: "15:00:00", scheduleEnd: "17:00:00"}, {id: "4", scheduleStart: "18:00:00", scheduleEnd: "20:00:00"}, {id: "5", scheduleStart: "21:00:00", scheduleEnd: "23:00:00"}, {id: "6", scheduleStart: "00:00:00", scheduleEnd: "02:00:00"}]},
]

const ageRatingColors={
    "P": "#4CAF50",
    "13+": "#FFA500",
    "16+": "#FF8C00",
    "18+": "#FF3B30"
}

const CollapsePanel = (props) => {
    return (
        <Flex style={{height:'40px'}} gap={15} align='center'>
            <img src={props.image} alt={"logo"} style={{width:'36px', height:'36px', border: '1px solid #d6d1d4', borderRadius: '5px'}} />
            <Flex vertical>
                <span style={{color: '#333', fontWeight: 600}}>{props.cinemaName}</span>
                <Tooltip title={props.address}>
                    <span style={{color: '#c7c7c7', fontSize: '12px', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis'}}>{props.address}</span>
                </Tooltip>
            </Flex>
        </Flex>
    );
}

const formatTime = (time) => {
    const [hour, minute] = time.split(':');
    return `${hour}:${minute}`;
}

function genresToString(genres) {
    return genres.map(g => g.name).join(', ');
}

const ScheduleContainer = (props) => {
    return (
        <div style={{display: 'flex', flexWrap: 'wrap', gap: '20px', maxWidth: '700px'}}>
            {
                props.schedules.map((item, index) => (
                    <ScheduleCard key={index} from={formatTime(item.scheduleStart)} to={formatTime(item.scheduleEnd)} />
                ))
            }
        </div>
    );
}


export default function MovieDetail() {
    const [isUserReviewed, setIsUserReviewed] = useState(false);
    const [canUserReview, setCanUserReview] = useState(false);

    const [openTrailer, setOpenTrailer] = useState(false);
    const handleViewTrailer = () => {
        setOpenTrailer(true);
    }

    const [province, setProvince] = useState("Hồ Chí Minh");
    const handleProvinceChange = (value) => {
        setProvince(value);
    }

    const [focusedDate, setFocusedDate] = useState(0);
    const handleDateChange = (item) => {
        setFocusedDate(item);
    };
    const [dateItems, setDateItems] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13])

    const [focusedCinema, setFocusedCinema] = useState(0);
    const handleCinemaChange = (item) => {
        setFocusedCinema(item);
    };

    const [collapseItems, setCollapseItems] = useState([]);
    useEffect(() => {
        setCollapseItems(cinemas.map((item, index) => (
            {key: index, label: (<CollapsePanel image={item.image} cinemaName={item.name} address={item.address}/>), children: (<ScheduleContainer schedules={item.schedules}/>)}
        )))
    }, [])

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5; // Number of reviews per page

    const paginatedReviews = sampleReviews.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const handleRating = ({ rating, content }) => {
        alert(rating + content);
    }

    const backgroundImage = "https://cinema.momocdn.net/img/80187507856383526-co-gi-moi-o-phim-zombie-dau-tien-tai-viet-nam-lost-in-mekong-delta-9dd-6275603.png";
    return (
        <ConfigProvider theme={{
            components: {
                Modal: {
                    contentBg: "#000"
                },
                Select: {
                    activeBorderColor: "#6cc832",
                    hoverBorderColor: "#9CEE69",
                    optionSelectedBg: "#D6F6C5"
                },
                Carousel: {
                    arrowOffset: -20
                },
                Pagination: {
                    colorPrimary: '#6cc832',
                    colorPrimaryHover: '#9CEE69',
                    colorPrimaryBorder: '#6cc832'
                }
            },
        }}>
            <main>
                <Flex vertical>
                    <div style={{position: 'relative', backgroundSize: 'cover', backgroundPosition: 'center', height: "fit-content", backgroundImage: `url(${backgroundImage})`, paddingTop: '20px', paddingBottom: '20px'}}>
                        <div style={{position: 'absolute', top: '0', left: '0', width: "100%", height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.8)', zIndex: 1}} />

                        <div style={{position: 'relative', zIndex: 2, display: "grid", gridTemplateColumns: '1.5fr 9fr 1.5fr', paddingTop: '100px', paddingBottom: '100px'}}>
                            <div style={{gridColumnStart: 2}}>
                                <Flex gap={40}>
                                    <img src={movie.moviePoster} alt="Movie Poster" style={{width: '250px', height: '360px', borderRadius: '10px'}} />
                                    <Flex vertical>
                                        <div style={{fontSize: '15px', color: '#fff', fontWeight: 'bold', padding: '3px', backgroundColor: `${ageRatingColors[movie.ageRating]}`, borderRadius: '3px', width: 'fit-content'}}>
                                            {movie.ageRating}
                                        </div>
                                        <span style={{color: '#fff', fontSize: '40px', fontWeight: 'bold'}}>
                                        {movie.movieName}
                                    </span>
                                        <span style={{color: "#a09f9d", fontSize: '16px', fontWeight: 600}}>
                                        {movie.movieName} · {new Date(movie.movieRelease).getFullYear()} · {movie.movieLength} phút
                                    </span>
                                        <Flex gap={8} align={'center'} style={{marginTop: '4px'}}>
                                            <img
                                                src="/rating.png"
                                                alt="Rating"
                                                style={{
                                                    width: 28,
                                                    height: 32,
                                                    alignItems: "center",
                                                    alignContent: "center",
                                                    transform: "translateY(2.5px)",
                                                }}
                                            />

                                            <span style={{color: "#fff", fontSize: '24px', fontWeight: 'bold'}}>{movie.movieRating}</span>
                                        </Flex>

                                        <p style={{color: "#a09f9d", fontSize: '16px', fontWeight: 400, fontStyle: 'italic', marginTop: '4px'}}>{movie.movieDescription}</p>

                                        <div>
                                            <span style={{color: "#fff", fontSize: '22px', fontWeight: 'bold'}}>Nội dung</span>
                                            <Tooltip title={movie.movieContent}>
                                                <p style={{
                                                    color: "#a09f9d",
                                                    fontSize: '16px',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis'
                                                }}>{movie.movieContent}</p>
                                            </Tooltip>
                                        </div>

                                        <Flex gap={20}>
                                            <Flex vertical>
                                                <span style={{color: "#a09f9d", fontSize: '16px'}}>Ngày chiếu</span>
                                                <span style={{color: "#fff", fontSize: '16px', fontWeight: 'bold'}}>{new Date(movie.movieRelease).toLocaleDateString('vi-VN')}</span>
                                            </Flex>

                                            <Flex vertical>
                                                <span style={{color: "#a09f9d", fontSize: '16px'}}>Thể loại</span>
                                                <span style={{color: "#fff", fontSize: '16px', fontWeight: 'bold'}}>{genresToString(movie.genres)}</span>
                                            </Flex>

                                            <Flex vertical>
                                                <span style={{color: "#a09f9d", fontSize: '16px'}}>Quốc gia</span>
                                                <span style={{color: "#fff", fontSize: '16px', fontWeight: 'bold'}}>{movie.movieNation}</span>
                                            </Flex>
                                        </Flex>

                                        <Button className="button-container" style={{transition: "background-color 0.3s ease", width: "fit-content", backgroundColor: "#9CEE69", borderColor: "#9CEE69", color: "#333", marginTop: '20px'}} onClick={handleViewTrailer}>
                                            Xem Trailer
                                        </Button>
                                    </Flex>
                                </Flex>
                            </div>
                        </div>
                    </div>

                    <div style={{display: "grid", gridTemplateColumns: '1.5fr 9fr 1.5fr', marginTop: '70px'}}>
                        <div style={{gridColumnStart: 2, display: "grid", gridTemplateColumns: '7fr 1fr 2fr'}}>
                            <Flex vertical style={{gridColumnStart: 1}} gap={10}>
                                <h3 style={{color: '#333'}}>Lịch chiếu: {movie.movieName}</h3>

                                <Select options={vietnamProvinces} value={province} onChange={handleProvinceChange} style={{width: "fit-content"}}></Select>

                                <div style={{ width: "750px", marginTop: '10px', marginBottom: '10px'}}>
                                    <Carousel className="my-carousel" arrows={true} dots={false} slidesToShow={10} initialSlide={0}>
                                        {dateItems.map((item) => (
                                            <div key={item} onClick={() => handleDateChange(item)}>
                                                <DateCard key={item} date={new Date(Date.now() + item * 24 * 60 * 60 * 1000)} isFocus={focusedDate === item}></DateCard>
                                            </div>
                                        ))}
                                    </Carousel>
                                </div>


                                <Flex style={{ width: "600px", marginTop: '10px', marginBottom: '10px'}} gap={20}>
                                    {cinemaBrands.map((cinema, index) => (
                                        <div key={index} onClick={() => handleCinemaChange(index)}>
                                            <CinemaCard cinemaIcon={cinema.image} cinemaName={cinema.name} isFocus={focusedCinema === index}></CinemaCard>
                                        </div>
                                    ))}
                                </Flex>

                                <Collapse accordion items={collapseItems} expandIconPosition='end'/>

                                <Divider style={{backgroundColor: '#d6d1d4'}}/>

                                <Flex vertical>
                                    <h3 style={{color: '#6cc832'}}>Tổng hợp đánh giá từ AI 🤖</h3>
                                    <p style={{color: '#a09f9d', fontSize: '16px', fontWeight: 400, fontStyle: 'italic', marginTop: '4px'}}>Đánh giá từ AI về nội dung phim</p>
                                </Flex>

                                <Divider style={{backgroundColor: '#d6d1d4'}}/>

                                <Flex vertical gap={10}>
                                    <h3 style={{color: '#333'}}>Đánh giá từ người xem</h3>

                                    <Flex align='center' gap={10}>
                                        <AiFillStar style={{height: '50px', width: '50px', color: '#fadb14'}}/>
                                        <div>
                                            <span style={{fontSize: '40px', fontWeight: 'bold', color: '#333'}}>{movie.movieRating}</span>
                                            <span style={{fontSize: '18px', color: '#333'}}>/5.0    ({sampleReviews.length} đánh giá)</span>
                                        </div>
                                    </Flex>

                                    {paginatedReviews.map((review, index) => (
                                        <ReviewCard key={index} avatar={review.avatar} content={review.content} username={review.username} date={review.date} rating={review.rating}/>
                                    ))}

                                    <Flex style={{width: '100%', marginBottom: '20px'}} align="center">
                                        <Pagination
                                            current={currentPage}
                                            pageSize={pageSize}
                                            total={sampleReviews.length}
                                            onChange={setCurrentPage}
                                            style={{ marginTop: 16 }}
                                        />
                                    </Flex>

                                    {isUserReviewed && canUserReview ? <ReviewInput onSubmit={handleRating} /> : <div/>}

                                </Flex>
                            </Flex>

                            <div style={{ position: 'sticky', top: 100, alignSelf: 'start', gridColumnStart: 3}}>
                                <Flex vertical gap={10}>
                                    <h3 style={{color: '#333'}}>Phim đang chiếu</h3>
                                    {sampleMovies.map((item, index) => (
                                        <div>
                                            <MovieHorizontalCard key={index} image={item.image} title={item.title} genres={genresToString(item.genres)} rating={item.rating} ageRating={item.ageRating}/>
                                            <Divider style={{backgroundColor: '#d6d1d4'}}/>
                                        </div>
                                    ))}
                                </Flex>
                            </div>
                        </div>
                    </div>
                </Flex>

                <Modal
                    open={openTrailer}
                    onCancel={() => setOpenTrailer(false)}
                    footer={null}
                    width={900}
                    centered
                    destroyOnClose
                >
                    <MovieTrailer trailerUrl={movie.movieTrailer}/>
                </Modal>
            </main>
        </ConfigProvider>
    )
}