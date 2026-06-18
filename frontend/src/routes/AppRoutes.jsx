import {
  lazy,
  Suspense,
} from "react";

import {
  Routes,
  Route,
} from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";
import PageLoader from "../components/PageLoader";

// Lazy Loaded Pages
const Home = lazy(() =>
  import("../pages/Home")
);

const Login = lazy(() =>
  import("../pages/Login")
);

const Register = lazy(() =>
  import("../pages/Register")
);

const VideoPlayer = lazy(() =>
  import("../pages/VideoPlayer")
);

const Channel = lazy(() =>
  import("../pages/Channel")
);

const CreateChannel = lazy(() =>
  import("../pages/CreateChannel")
);

const UploadVideo = lazy(() =>
  import("../pages/UploadVideo")
);

const EditVideo = lazy(() =>
  import("../pages/EditVideo")
);

const NotFound = lazy(() =>
  import("../pages/NotFound")
);

const AppRoutes = () => {
  return (
    <Suspense
      fallback={ <PageLoader /> }
    >
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/video/:id"
          element={<VideoPlayer />}
        />

        <Route
          path="/channel/:id"
          element={<Channel />}
        />

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

        <Route
          path="/edit-video/:id"
          element={
            <ProtectedRoute>
              <EditVideo />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;