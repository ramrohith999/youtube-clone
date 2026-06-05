import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getVideos, getVideoById } from "../../services/videoService";

export const fetchVideos = createAsyncThunk("videos/fetchVideos", async () => {
  return await getVideos();
});

export const fetchVideoById = createAsyncThunk(
  "videos/fetchVideoById",
  async (id) => {
    return await getVideoById(id);
  },
);

const videoSlice = createSlice({
  name: "videos",

  initialState: {
    videos: [],
    currentVideo: null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchVideos.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload;
      })

      .addCase(fetchVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchVideoById.fulfilled, (state, action) => {
        state.currentVideo = action.payload;
      });
  },
});

export default videoSlice.reducer;
