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

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/video/:id" element={<VideoPlayer />} />

      <Route path="/channel/:id" element={<Channel />} />

      <Route path="/create-channel" element={<CreateChannel />} />

      <Route path="/upload-video" element={<UploadVideo />} />

      <Route path="*" element={<NotFound />} />

      <Route path="/edit-video/:id" element={<EditVideo />} />
    </Routes>
  );
};

export default AppRoutes;
