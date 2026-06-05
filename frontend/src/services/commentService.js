import API from "./authService";

export const getComments = async (
  videoId
) => {
  const response = await API.get(
    `/comments/${videoId}`
  );

  return response.data;
};

export const createComment = async (
  data
) => {
  const response = await API.post(
    "/comments",
    data
  );

  return response.data;
};

export const updateComment = async (
  id,
  text
) => {
  const response = await API.put(
    `/comments/${id}`,
    { text }
  );

  return response.data;
};

export const deleteComment = async (
  id
) => {
  const response = await API.delete(
    `/comments/${id}`
  );

  return response.data;
};