import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const Layout = React.lazy(() => import("./Layout"));
const Home = React.lazy(() => import("./components/Home/Home"));
const Movies = React.lazy(() => import("./components/Movies/Movies"));
const Cinema = React.lazy(() => import("./components/Cinemas/Cinemas"));
const Blog = React.lazy(() => import("./components/Blog/Blog"));
const DetailBlog = React.lazy(() => import("./components/Blog/DetailBlog"));
const MovieDetail = React.lazy(() => import("./components/Movies/MovieDetail"));
const UserProfile = React.lazy(() => import("./components/User/UserProfile"));

function App() {
  return (
    <>
      {" "}
      <ToastContainer position="top-right"></ToastContainer>
      <Routes className="rootApp">
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="movie" element={<Movies />} />
          <Route path="cinema/:id" element={<Cinema />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:id" element={<DetailBlog />} />
          <Route path="movie/:movieId" element={<MovieDetail />} />
          <Route path="user/profile" element={<UserProfile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
