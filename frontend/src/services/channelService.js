import API from "./authService";

export const createChannel = async (channelData) => {
  const response = await API.post("/channels", channelData);

  return response.data;
};
