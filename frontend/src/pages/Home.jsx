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
      <FilterBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {loading && <h2 className="text-center">Loading Videos...</h2>}

      {error && <h2 className="text-center text-red-500">{error}</h2>}

      {filteredVideos.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold">No videos found</h2>

          <p className="text-gray-500 mt-2">
            Try a different search or category
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
    gap-6
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
