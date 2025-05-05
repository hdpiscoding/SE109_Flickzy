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
    "Latest articles, reviews, and news about movies and series."
  );
  const onChange = (key) => {
    switch (key) {
      case "1":
        setTitle("Latest");
        setDescription(
          "Latest articles, reviews, and news about movies and series."
        );
        break;
      case "2":
        setTitle("Theatrical movie");
        setDescription("Theatrical movie reviews and news.");
        break;
      case "3":
        setTitle("Movie Collection");
        setDescription("Movie collection reviews and news.");
        break;
      case "4":
        setTitle("Movie Review");
        setDescription("Movie reviews and news.");
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
