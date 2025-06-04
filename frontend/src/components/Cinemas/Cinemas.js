import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import "./Cinemas.scss";
import { Col, Image, Row } from "antd";
import { useParams } from "react-router-dom";
import { getACinemaBrand } from "../../services/CinemaService";
import BookingComponent from "./BookingComponent";

export default function Cinemas() {
  const { id } = useParams();
  const [cinemaBrand, setCinemaBrand] = useState(null);

  useEffect(() => {
    const fetchCinemaBrand = async () => {
      console.log("id", id);
      if (!id) return;
      try {
        const res = await getACinemaBrand(id);
        setCinemaBrand(res || null);
      } catch (error) {
        setCinemaBrand(null);
      }
    };
    fetchCinemaBrand();
  }, [id]);
  useEffect(() => {
    console.log("cinemaBrand state:", cinemaBrand);
  }, [cinemaBrand]);

  return (
    <div className="cinemas-wrapper">
      <div className="cinema-container">
        <div
          className="cinema-headerr"
          style={{
            backgroundImage: cinemaBrand?.cover
              ? `url(${cinemaBrand.cover})`
              : undefined,
          }}>
          <Row className="cinema-info container">
            <Col>
              <Image
                width={120}
                className="cinema-logo"
                src={cinemaBrand?.avatar}
              />
            </Col>
            <Col className="cinema-details">
              <h2>{cinemaBrand?.brandName}</h2>
              <div>Hệ thống rạp chiếu phim từ Hàn Quốc</div>
              <div className="cinema-rating">
                <span>⭐ 5 / 5</span>
                <span>9218 đánh giá</span>
              </div>
              <p>49 cửa hàng trong hệ thống</p>
            </Col>
          </Row>
        </div>
        <div className="container">
          <div className="cinema-schedule">
            <div className="schedule-title">
              Lịch chiếu phim {cinemaBrand?.brandName}
            </div>
            <BookingComponent haveclosebtn={false}></BookingComponent>
          </div>
          <div className="markdown">
            <ReactMarkdown>{cinemaBrand?.description}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
