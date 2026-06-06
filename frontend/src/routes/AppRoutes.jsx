import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import VideoPlayer from "../pages/VideoPlayer";
import Channel from "../pages/Channel";
import CreateChannel from "../pages/CreateChannel";
import UploadVideo from "../pages/UploadVideo";
import NotFound from "../pages/NotFound";
import EditVideo from "../pages/EditVideo";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/video/:id" element={<VideoPlayer />} />

      <Route path="/channel/:id" element={<Channel />} />

      <Route
        path="/create-channel"
        element={
          <ProtectedRoute>
            <CreateChannel />
          </ProtectedRoute>
        }
      />

      <Route
        path="/upload-video"
        element={
          <ProtectedRoute>
            <UploadVideo />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />

      <Route
        path="/edit-video/:id"
        element={
          <ProtectedRoute>
            <EditVideo />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
