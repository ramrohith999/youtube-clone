const getYoutubeEmbedUrl = (url) => {
  const videoId = url.split("v=")[1];

  return `https://www.youtube.com/embed/${videoId}`;
};

export default getYoutubeEmbedUrl;