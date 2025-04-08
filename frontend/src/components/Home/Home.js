import React, { useState, useEffect } from "react";
import "./Home.css";
import Button from "../OtherComponents/Button";

const movies = [
  {
    title: "Spider-Man: No Way Home",
    description:
      "A multiverse adventure featuring Spider-Man and Doctor Strange.",
    image:
      "https://www.elleman.vn/app/uploads/2021/12/20/208672/review-phim-spider-man-no-way-home-elle-man-cover-1.jpeg",
    thumb:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROKFnEUty_-vawXAOMg2gNCDr8GKcwlViGH1Tnkai3RY8xmzzviJpOVeCibUtyC4uk8vs&usqp=CAU",
  },
  {
    title: "Avengers: Endgame",
    description: "The Avengers unite to reverse Thanos' actions.",
    image:
      "https://genk.mediacdn.vn/139269124445442048/2020/2/14/1-15816746144451193748082.jpg",
    thumb: "https://f.ptcdn.info/697/063/000/pqmq2j2e21Dcog9BrB4d-o.jpg",
  },
  {
    title: "Doctor Strange",
    description: "The origin story of the Sorcerer Supreme.",
    image:
      "https://touchcinema.com/storage/phim-doctor-strange/phim-doctor-strange.jpg",
    thumb:
      "https://m.media-amazon.com/images/M/MV5BNjgwNzAzNjk1Nl5BMl5BanBnXkFtZTgwMzQ2NjI1OTE@._V1_.jpg",
  },
];

export default function Home() {
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
    <div className="home-container">
      <div
        className="carousel-container"
        style={{ backgroundImage: `url(${current.image})` }}
      >
        <div className="carousel-gradient-overlay"></div>
        <div className="carousel-overlay">
          <h1>{current.title}</h1>
          <p>{current.description}</p>
          <div className="buttons">
            <Button text="Book Ticket"></Button>
            <button className="btn btn-secondary">Watch Trailer</button>
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
      <div>
        qưeqwewqeqqqqqqqqqqqqqqq qưeqqqqqqqqqqqqqqqqweqweqweqwe
        qưeqwewqeqqqqqqqqqqqqqqq qưeqqqqqqqqqqqqqqqqweqweqweqwe
        qưeqwewqeqqqqqqqqqqqqqqq qưeqqqqqqqqqqqqqqqqweqweqweqwe
        qưeqwewqeqqqqqqqqqqqqqqq qưeqqqqqqqqqqqqqqqqweqweqweqwe
        qưeqwewqeqqqqqqqqqqqqqqq qưeqqqqqqqqqqqqqqqqweqweqweqwe
        qưeqwewqeqqqqqqqqqqqqqqq qưeqqqqqqqqqqqqqqqqweqweqweqwe
        qưeqwewqeqqqqqqqqqqqqqqq qưeqqqqqqqqqqqqqqqqweqweqweqwe
        qưeqwewqeqqqqqqqqqqqqqqq qưeqqqqqqqqqqqqqqqqweqweqweqwe
        qưeqwewqeqqqqqqqqqqqqqqq qưeqqqqqqqqqqqqqqqqweqweqweqwe
        qưeqwewqeqqqqqqqqqqqqqqq qưeqqqqqqqqqqqqqqqqweqweqweqwe
        qưeqwewqeqqqqqqqqqqqqqqq qưeqqqqqqqqqqqqqqqqweqweqweqwe
        qưeqwewqeqqqqqqqqqqqqqqq qưeqqqqqqqqqqqqqqqqweqweqweqwe
        qưeqwewqeqqqqqqqqqqqqqqq qưeqqqqqqqqqqqqqqqqweqweqweqwe
        qưeqwewqeqqqqqqqqqqqqqqq qưeqqqqqqqqqqqqqqqqweqweqweqwe
        qưeqwewqeqqqqqqqqqqqqqqq qưeqqqqqqqqqqqqqqqqweqweqweqwe
        qưeqwewqeqqqqqqqqqqqqqqq qưeqqqqqqqqqqqqqqqqweqweqweqwe
        qưeqwewqeqqqqqqqqqqqqqqq qưeqqqqqqqqqqqqqqqqweqweqweqwe
        qưeqwewqeqqqqqqqqqqqqqqq qưeqqqqqqqqqqqqqqqqweqweqweqwe
        qưeqwewqeqqqqqqqqqqqqqqq qưeqqqqqqqqqqqqqqqqweqweqweqwe
        qưeqwewqeqqqqqqqqqqqqqqq qưeqqqqqqqqqqqqqqqqweqweqweqwe
        qưeqwewqeqqqqqqqqqqqqqqq qưeqqqqqqqqqqqqqqqqweqweqweqwe
        qưeqwewqeqqqqqqqqqqqqqqq qưeqqqqqqqqqqqqqqqqweqweqweqwe
        qưeqwewqeqqqqqqqqqqqqqqq qưeqqqqqqqqqqqqqqqqweqweqweqwe
        qưeqwewqeqqqqqqqqqqqqqqq qưeqqqqqqqqqqqqqqqqweqweqweqwe
      </div>
    </div>
  );
}
