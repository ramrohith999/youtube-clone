import { useState } from "react";

import MainLayout from "../layouts/MainLayout";

import FilterBar from "../components/FilterBar";
import VideoCard from "../components/VideoCard";

import mockVideos from "../utils/mockVideos";

const Home = () => {
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const filteredVideos =
    selectedCategory === "All"
      ? mockVideos
      : mockVideos.filter(
          (video) =>
            video.category === selectedCategory
        );

  return (
    <MainLayout>

      <FilterBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-6
        "
      >
        {filteredVideos.map((video) => (
          <VideoCard
            key={video._id}
            video={video}
          />
        ))}
      </div>

    </MainLayout>
  );
};

export default Home;