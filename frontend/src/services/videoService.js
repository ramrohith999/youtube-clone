import API from "./authService";

export const getVideos = async () => {
  const response = await API.get("/videos");
  return response.data;
};