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
    label: "Mới nhất",
    children: <Latest />,
  },
  {
    key: "2",
    label: "Phim chiếu rạp",
    children: <TheatricalMovie />,
  },
  {
    key: "3",
    label: "Tổng hợp phim",
    children: <MovieCollection />,
  },
  {
    key: "4",
    label: "Đánh giá phim",
    children: <MovieReview />,
  },
];
export default function Blog() {
  useEffect(() => {}, []);
  const [title, setTitle] = React.useState("Mới nhất");
  const [description, setDescription] = React.useState(
    "Cập nhật những blog phim mới nhất trên thị trường, đa dạng thể loại và quốc gia. Khám phá những nội dung điện ảnh hấp dẫn và lôi cuốn."
  );
  const onChange = (key) => {
    switch (key) {
      case "1":
        setTitle("Mới nhất");
        setDescription(
          "Cập nhật những blog phim mới nhất trên thị trường, đa dạng thể loại và quốc gia. Khám phá những nội dung điện ảnh hấp dẫn và lôi cuốn."
        );
        break;
      case "2":
        setTitle("Phim chiếu rạp");
        setDescription(
          "Những bom tấn và phim chiếu rạp gây ấn tượng mạnh – chỉ có tại Flickzy."
        );
        break;
      case "3":
        setTitle("Tổng hợp phim");
        setDescription(
          "Tổng hợp những bộ phim, series, nội dung Netflix và nhiều hơn nữa."
        );
        break;
      case "4":
        setTitle("Đánh giá phim");
        setDescription(
          "Những bài đánh giá phim hay, phim trực tuyến, phim chiếu rạp và nhiều hơn thế nữa..."
        );
        break;
      default:
        break;
    }
  };
  return (
    <>
      <div className="blog-wrapper">
        <div className="container">
          <div className="title">{title}</div>
          <div className="description">{description}</div>
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
      </div>
    </>
  );
}
