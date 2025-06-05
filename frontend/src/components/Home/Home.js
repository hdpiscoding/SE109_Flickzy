import React, { useState, useEffect } from "react";
import { IoPlayCircleOutline } from "react-icons/io5";
import { useOutletContext } from "react-router-dom";
import "./Home.css";
import { useNavigate } from "react-router-dom";

import Button from "../OtherComponents/Button";
import BookingComponent from "../Book/BookingComponent";
import BlogHome from "./Blog";
import { getAllMovies } from "../../services/MovieService";
import { Spin } from "antd";
export default function Home() {
  const { handleBookingToggle, setType, setIsVisible, setTrailerlink } =
    useOutletContext();
  const [index, setIndex] = useState(0);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); // Thêm state loading
  const navigate = useNavigate();
  useEffect(() => {
    // Gọi API lấy danh sách phim
    const fetchMovies = async () => {
      setLoading(true); // Bắt đầu loading
      try {
        const res = await getAllMovies({ page: 1, limit: 5, isShowing: true });
        const data = res.data || [];
        // Map lại dữ liệu cho phù hợp với carousel
        setMovies(
          data.map((item) => ({
            id: item.id,
            tag: item.ageRating,
            tag_color:
              item.ageRating === "18+"
                ? "red"
                : item.ageRating === "16+"
                ? "#FF8C00"
                : item.ageRating === "13+"
                ? "#FFA500"
                : "#4CAF50",
            title: item.movieName,
            description: item.movieContent?.slice(0, 80) + "...",
            detail: item.movieContent,
            image: item.movieBackground || item.moviePoster,
            thumb: item.moviePoster,
            date: item.movieRelease
              ? new Date(item.movieRelease).toLocaleDateString("vi-VN")
              : "",
            rating: item.movieRating ?? "N/A",
            genres: item.genres?.map((g) => g.name).join(", "),
            time: item.movieLength ? `${item.movieLength} phút` : "",
            trailerlink: item.movieTrailer,
          }))
        );
      } catch (e) {
        setMovies([]);
      } finally {
        setLoading(false); // Kết thúc loading
      }
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    if (movies.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % movies.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [movies]);

  const current = movies[index] || {};

  const handleClick = (i) => {
    setIndex(i);
  };
  return (
    <div
      className="home-container"
      style={{ fontFamily: '"Aminute", sans-serif' }}>
      {loading ? (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#000",
            zIndex: 9999,
            position: "fixed",
            top: 0,
            left: 0,
          }}>
          <Spin size="large" tip="Đang tải..." />
        </div>
      ) : (
        <div
          className="carousel-container"
          style={{ backgroundImage: `url(${current.image})` }}>
          <div className="carousel-gradient-overlay"></div>
          <div className="carousel-overlay">
            <div style={{ display: "flex", gap: 16 }}>
              <div
                className="tag"
                style={{
                  fontSize: 16,
                  backgroundColor: current.tag_color,
                  width: "fit-content",
                  minWidth: 40,
                  height: "fit-content",
                  textAlign: "center",
                  marginTop: 11.5,
                  padding: "2px 5px",
                  fontWeight: "bold",
                  borderRadius: "5px",
                }}>
                {current.tag}
              </div>
              <div
                style={{
                  fontSize: 31,
                  fontWeight: "bold",
                  marginTop: 8,
                  fontFamily: '"Roboto", sans-serif',
                  maxWidth: 800, // Thêm dòng này, tăng giá trị nếu muốn title dài hơn
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  lineHeight: 1.2,
                }}>
                {current.title}
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <img
                src="/rating.png"
                alt="Đánh giá"
                style={{
                  width: 28,
                  height: 32,
                  alignItems: "center",
                  alignContent: "center",
                  transform: "translateY(2.5px)",
                }}
              />
              <div className="rating">{current.rating}</div>
            </div>

            <div className="chunhat">{current.detail}</div>
            <div
              style={{
                display: "flex",
                gap: 20,
                marginTop: "0 16px !important",
                fontSize: 16,
              }}>
              <div>
                <div className="chudam">Thời lượng</div>
                <div className="chunhat">{current.time}</div>
              </div>
              <div>
                <div className="chudam">Thể loại</div>
                <div className="chunhat">{current.genres}</div>
              </div>
              <div>
                <div className="chudam">Ngày khởi chiếu</div>
                <div className="chunhat">{current.date}</div>
              </div>
            </div>
            <br></br>
            <div className="buttons">
              <Button
                onClick={() => {
                  navigate(`/movie/${current.id}`);
                }}
                text="Xem chi tiết"
                fontSize={16}></Button>

              <button
                onClick={() => {
                  setType(2);
                  setIsVisible(true);
                  setTrailerlink(current.trailerlink);
                }}
                className="btnn btn-secondary"
                style={{
                  alignContent: "center",
                  alignItems: "center",
                }}>
                {" "}
                <IoPlayCircleOutline
                  style={{
                    fontSize: 16,

                    marginRight: 5,
                  }}
                />
                Xem trailer
              </button>
            </div>
          </div>

          <div className="thumbnail-row">
            {movies.map((movie, i) => (
              <img
                style={{ backgroundColor: "gray" }}
                key={i}
                src={movie.thumb}
                alt={movie.title}
                className={`thumbnail ${i === index ? "active" : ""}`}
                onClick={() => handleClick(i)}
              />
            ))}
          </div>
        </div>
      )}
      <div className="midle-title">
        <div style={{ transform: "translateY(-4px)" }}>LỊCH CHIẾU PHIM</div>
      </div>
      <div style={{ backgroundColor: "#F8F8F8" }}>
        {" "}
        <BookingComponent haveclosebtn={false}></BookingComponent>
      </div>
      <div className="midle-title">
        <div style={{ transform: "translateY(-4px)" }}>BLOG</div>
      </div>
      <div
        style={{ backgroundColor: "#F8F8F8", padding: " 40px 100px 0 100px" }}>
        {" "}
        <BlogHome></BlogHome>
      </div>
    </div>
  );
}
