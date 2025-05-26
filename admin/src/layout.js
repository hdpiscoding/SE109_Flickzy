import { Routes, Route, Navigate } from "react-router-dom";
import Cinema from "./components/Cinema/Cinema";
import Movies from "./components/Movies/Movies";
import Brands from "./components/Brands/Brands";
import Rooms from "./components/Rooms/Rooms";
import Schedules from "./components/Schedules/Schedules";
import NewRoom from "./components/Rooms/NewRoom";
import NewRoom2 from "./components/Rooms/NewRoom2";
import App from "./App";
import Blog from "./components/Blogs/Blog";
import Login from "./components/Login";

const Layout = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<App />}>
          <Route index element={<Cinema />} />
          <Route path="brands" element={<Brands />} />
          <Route path="movies" element={<Movies />} />
          <Route path="schedules" element={<Schedules />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="blogs" element={<Blog />} />
          <Route path="new-room" element={<NewRoom />} />
          <Route path="new-room2" element={<NewRoom2 />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  );
};

export default Layout;
