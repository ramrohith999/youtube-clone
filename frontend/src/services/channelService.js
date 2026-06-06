import API from "./authService";

export const createChannel = async (channelData) => {
  const response = await API.post("/channels", channelData);

  return response.data;
};


export const getChannelById =
  async (id) => {
    const response = await API.get(
      `/channels/${id}`
    );

    return response.data;
  };

export const getChannelVideos =
  async (id) => {
    const response = await API.get(
      `/channels/${id}/videos`
    );

    return response.data;
  };

  export const getChannelByOwner = async (
  userId
) => {
  const response = await API.get(
    `/channels/owner/${userId}`
  );

  return response.data;
};