import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import MainLayout from "../layouts/MainLayout";

import FilterBar from "../components/FilterBar";
import VideoCard from "../components/VideoCard";
import { useSearchParams } from "react-router-dom";

import { fetchVideos } from "../features/videos/videoSlice";

const Home = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const { videos, loading, error } = useSelector((state) => state.videos);

  const categoryFromUrl = searchParams.get("category") || "All";

  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);

  //filtering the videos
  const filteredVideos = videos.filter((video) => {
    const matchesCategory =
      selectedCategory === "All" || video.category === selectedCategory;

    const matchesSearch = video.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <MainLayout searchTerm={searchTerm} setSearchTerm={setSearchTerm}>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Discover Videos</h1>

        <p className="text-gray-500 mt-1">
          Explore tutorials, gaming, music and more.
        </p>
      </div>

      <FilterBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {loading && (
        <div className="flex justify-center items-center py-20">
          <div
            className="
        animate-spin
        rounded-full
        h-12
        w-12
        border-b-2
        border-red-500
      "
          />
        </div>
      )}
      {error && (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-red-500">
            Something went wrong
          </h2>

          <p className="text-gray-500 mt-2">{error}</p>
        </div>
      )}
      {filteredVideos.length === 0 ? (
        <div className="text-center py-24">
          <div className="text-6xl mb-4">🎥</div>

          <h2 className="text-3xl font-bold">No Videos Found</h2>

          <p className="text-gray-500 mt-3">
            Try another category or search term.
          </p>
        </div>
      ) : (
        <div
          className="
    grid
    grid-cols-1
    sm:grid-cols-2
    lg:grid-cols-3
    xl:grid-cols-4
    gap-8
  "
        >
          {filteredVideos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      )}
    </MainLayout>
  );
};

export default Home;
