import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addToBookmark = createAsyncThunk(
  "bookmark/addToBookmark",
  async ({ postId, token }, { rejectWithValue }) => {
    try {
      const { data, status } = await axios({
        method: "POST",
        url: `/api/users/bookmark/${postId}`,
        headers: { authorization: token },
        data: {},
      });
      if (status === 200) {
        return {
          addToBookmark: data.bookmarks,
          message: "Post bookmarked successfully",
        };
      }
    } catch (e) {
      console.error(e);
      return rejectWithValue({ message: "Failed to bookmark post" });
    }
  }
);

const initialState = {
  bookmarks: [],
  state: "idle",
};

export const bookmartSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {},
  extraReducers: {
    // Add to Bookmark
    [addToBookmark.pending]: (state) => {
      state.status = "pending";
    },
    [addToBookmark.fulfilled]: (state, { payload }) => {
      state.status = "fulfilled";
      state.bookmarks = payload.addToBookmark;
    },
    [addToBookmark.rejected]: (state) => {
      state.status = "rejected";
    },
  },
});

export default bookmartSlice.reducer;
