import API from "./authService";

export const getVideos = async () => {
  const response = await API.get("/videos");
  return response.data;
};

export const getVideoById = async (id) => {
  const response = await API.get(`/videos/${id}`);
  return response.data;
};

export const likeVideo = async (videoId, userId) => {
  const response = await API.patch(`/videos/${videoId}/like`, { userId });

  return response.data;
};

export const dislikeVideo = async (videoId, userId) => {
  const response = await API.patch(`/videos/${videoId}/dislike`, { userId });

  return response.data;
};

export const createVideo = async (videoData) => {
  const response = await API.post("/videos", videoData);

  return response.data;
};

export const deleteVideo = async (id) => {
  const response = await API.delete(`/videos/${id}`);

  return response.data;
};

export const updateVideo = async (id, data) => {
  const response = await API.put(`/videos/${id}`, data);

  return response.data;
};

export const incrementViews = async (id) => {
  const response = await API.patch(`/videos/${id}/view`);

  return response.data;
};
