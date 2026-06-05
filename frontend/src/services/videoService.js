import API from "./authService";

export const getVideos = async () => {
  const response = await API.get("/videos");
  return response.data;
};

export const getVideoById = async (id) => {
  const response = await API.get(`/videos/${id}`);
  return response.data;
};

export const likeVideo = async (
  videoId,
  userId
) => {
  const response = await API.patch(
    `/videos/${videoId}/like`,
    { userId }
  );

  return response.data;
};

export const dislikeVideo = async (
  videoId,
  userId
) => {
  const response = await API.patch(
    `/videos/${videoId}/dislike`,
    { userId }
  );

  return response.data;
};