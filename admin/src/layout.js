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
import MovieDetail from "./components/Movies/MovieDetail";
import AddMovie from "./components/Movies/AddMovie";
import EditMovie from "./components/Movies/EditMovie";
import Login from "./components/Auth/LoginPage";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

const Layout = () => {
  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <App />
            </ProtectedRoute>
          }>
          <Route index element={<Cinema />} />
          <Route path="brands" element={<Brands />} />
          <Route path="movies" element={<Movies />} />
          <Route path="movies/:movieId" element={<MovieDetail />} />
          <Route path="movies/add" element={<AddMovie />} />
          <Route path="movies/:movieId/edit" element={<EditMovie />} />
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
