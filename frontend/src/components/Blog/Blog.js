import React, { useEffect } from "react";
import { Tabs } from "antd";
import Latest from "./tabs/Latest";
import TheatricalMovie from "./tabs/TheatricalMovie";
import MovieCollection from "./tabs/MovieCollection";
import MovieReview from "./tabs/MovieReview";
import "./Blog.scss";

const items = [
  {
    key: "1",
    label: "Latest",
    children: <Latest />,
  },
  {
    key: "2",
    label: "Theatrical movie",
    children: <TheatricalMovie />,
  },
  {
    key: "3",
    label: "Movie Collection",
    children: <MovieCollection />,
  },
  {
    key: "4",
    label: "Movie Review",
    children: <MovieReview />,
  },
];
export default function Blog() {
  useEffect(() => {}, []);
  const [title, setTitle] = React.useState("Latest");
  const [description, setDescription] = React.useState(
    "Stay updated with the best movie blogs on the market, covering all genres and countries. Unravel intriguing and captivating film content."
  );
  const onChange = (key) => {
    switch (key) {
      case "1":
        setTitle("Latest");
        setDescription(
          "Stay updated with the best movie blogs on the market, covering all genres and countries. Unravel intriguing and captivating film content."
        );
        break;
      case "2":
        setTitle("Theatrical movie");
        setDescription(
          "Blockbuster and theatrical releases that leave a strong impression—only on Flickzy."
        );
        break;
      case "3":
        setTitle("Movie Collection");
        setDescription(
          "A collection of exciting movies, series, Netflix content, and more."
        );
        break;
      case "4":
        setTitle("Movie Review");
        setDescription(
          "Great movie reviews, online films, theatrical releases, and much more..."
        );
        break;
      default:
        break;
    }
  };
  return (
    <>
      <div className="container">
        <div className="title">{title}</div>
        <div className="description">{description}</div>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
    </>
  );
}
