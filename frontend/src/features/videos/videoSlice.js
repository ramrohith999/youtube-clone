import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import { getVideos } from "../../services/videoService";

export const fetchVideos = createAsyncThunk(
  "videos/fetchVideos",
  async () => {
    return await getVideos();
  }
);

const videoSlice = createSlice({
  name: "videos",

  initialState: {
    videos: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchVideos.pending, (state) => {
        state.loading = true;
      })

      .addCase(
        fetchVideos.fulfilled,
        (state, action) => {
          state.loading = false;
          state.videos = action.payload;
        }
      )

      .addCase(
        fetchVideos.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      );
  },
});

export default videoSlice.reducer;