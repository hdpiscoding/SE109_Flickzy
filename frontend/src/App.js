import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./components/Home/Home";
import Movies from "./components/Movies/Movies";
import Cinema from "./components/Cinemas/Cinemas";
import Blog from "./components/Blog/Blog";
import DetailBlog from "./components/Blog/DetailBlog";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="movie" element={<Movies />} />
        <Route path="cinema" element={<Cinema />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:id" element={<DetailBlog />} />
      </Route>
    </Routes>
  );
}

export default App;
