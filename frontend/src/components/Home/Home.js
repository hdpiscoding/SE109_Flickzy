import React, { useState, useEffect } from "react";
import { IoPlayCircleOutline } from "react-icons/io5";
import { useOutletContext } from "react-router-dom";
import "./Home.css";
import Button from "../OtherComponents/Button";
import BookingComponent from "../Book/BookingComponent";
import BlogHome from "./Blog";
const movies = [
  {
    tag: "18+",
    tag_color: "red",
    title: "Spider-Man: No Way Home",
    description:
      "A multiverse adventure featuring Spider-Man and Doctor Strange.",
    detail:
      "Spider-Man: No Way Home is a thrilling multiverse adventure where Peter Parker teams up with Doctor Strange to fix the chaos caused by a botched spell. The film features appearances from iconic villains and alternate versions of Spider-Man, delivering emotional moments, intense action, and a heartfelt exploration of responsibility and sacrifice.",
    image:
      "https://www.elleman.vn/app/uploads/2021/12/20/208672/review-phim-spider-man-no-way-home-elle-man-cover-1.jpeg",
    thumb:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROKFnEUty_-vawXAOMg2gNCDr8GKcwlViGH1Tnkai3RY8xmzzviJpOVeCibUtyC4uk8vs&usqp=CAU",
    date: "04/04/2025",
    rating: 8.5,
    genres: "Action, Adventure, Fantasy",
    time: "2h 10m",
    trailerlink: "https://www.youtube.com/watch?v=JfVOs4VSpmA",
  },
  {
    tag: "18+",
    tag_color: "red",
    title: "Avengers: Endgame",
    description: "The Avengers unite to reverse Thanos' actions.",
    detail:
      "Avengers: Endgame is the epic conclusion to the Infinity Saga, where the remaining Avengers team up to reverse the devastating effects of Thanos' snap. The film features time travel, emotional farewells, and a climactic battle against Thanos. It explores themes of sacrifice, friendship, and the consequences of power. The film is a culmination of over a decade of storytelling in the Marvel Cinematic Universe.",

    image:
      "https://genk.mediacdn.vn/139269124445442048/2020/2/14/1-15816746144451193748082.jpg",
    thumb: "https://f.ptcdn.info/697/063/000/pqmq2j2e21Dcog9BrB4d-o.jpg",
    date: "04/04/2025",
    rating: 8.5,
    genres: "Action, Adventure, Fantasy",
    time: "2h 10m",
    trailerlink: "https://www.youtube.com/watch?v=TcMBFSGVi1c",
  },
  {
    tag: "18+",
    tag_color: "red",
    title: "Doctor Strange",

    description: "The origin story of the Sorcerer Supreme.",
    detail:
      "Doctor Strange follows the story of Stephen Strange, a brilliant but arrogant neurosurgeon who loses the use of his hands in a car accident. Desperate to heal himself, he seeks out alternative medicine and eventually discovers the mystical arts. Under the tutelage of the Ancient One, he learns to harness magic and becomes the Sorcerer Supreme, protecting Earth from mystical threats. The film explores themes of redemption, sacrifice, and the battle between good and evil.",
    image:
      "https://touchcinema.com/storage/phim-doctor-strange/phim-doctor-strange.jpg",
    thumb:
      "https://m.media-amazon.com/images/M/MV5BNjgwNzAzNjk1Nl5BMl5BanBnXkFtZTgwMzQ2NjI1OTE@._V1_.jpg",
    date: "04/04/2025",
    rating: 8.5,
    genres: "Action, Adventure, Fantasy",
    time: "2h 10m",
    trailerlink: "https://www.youtube.com/watch?v=aWzlQ2N6qqg",
  },
];

export default function Home() {
  const { handleBookingToggle, setType, setIsVisible, setTrailerlink } =
    useOutletContext();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % movies.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const current = movies[index];

  const handleClick = (i) => {
    setIndex(i);
  };

  return (
    <div
      className="home-container"
      style={{ fontFamily: '"Aminute", sans-serif' }}
    >
      <div
        className="carousel-container"
        style={{ backgroundImage: `url(${current.image})` }}
      >
        <div className="carousel-gradient-overlay"></div>
        <div className="carousel-overlay">
          <div
            className="tag"
            style={{
              fontSize: 16,
              backgroundColor: current.tag_color,
              width: "fit-content",
              padding: "2px 5px",
              fontWeight: "bold",
              borderRadius: "5px",
            }}
          >
            {current.tag}
          </div>

          <div
            style={{
              fontSize: 36,
              fontWeight: "bold",
              marginTop: 8,
              fontFamily: '"Roboto", sans-serif',
            }}
          >
            {current.title}
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
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
            <div className="rating">{current.rating}</div>
          </div>

          <div className="chunhat">{current.detail}</div>
          <div
            style={{
              display: "flex",
              gap: 20,
              marginTop: "0 16px !important",
              fontSize: 16,
            }}
          >
            <div>
              <div className="chudam">Time</div>
              <div className="chunhat">{current.time}</div>
            </div>
            <div>
              <div className="chudam">Genres </div>
              <div className="chunhat">{current.genres}</div>
            </div>
            <div>
              <div className="chudam">Date</div>
              <div className="chunhat">{current.date}</div>
            </div>
          </div>
          <br></br>
          <div className="buttons">
            <Button text="Book Ticket" fontSize={16}></Button>

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
              }}
            >
              {" "}
              <IoPlayCircleOutline
                style={{
                  fontSize: 16,

                  marginRight: 5,
                }}
              />
              Watch Trailer
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
      <div className="midle-title">
        <div style={{ transform: "translateY(-4px)" }}>MOVIE SHOWTIMES</div>
      </div>
      <div style={{ backgroundColor: "#F8F8F8" }}>
        {" "}
        <BookingComponent haveclosebtn={false}></BookingComponent>
      </div>
      <div className="midle-title">
        <div style={{ transform: "translateY(-4px)" }}>BLOGS</div>
      </div>
      <div
        style={{ backgroundColor: "#F8F8F8", padding: " 40px 100px 0 100px" }}
      >
        {" "}
        <BlogHome></BlogHome>
      </div>
    </div>
  );
}
