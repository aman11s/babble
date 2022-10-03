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
          message: "Bookmarked successfully",
        };
      }
    } catch (e) {
      console.error(e);
      return rejectWithValue({ message: "Failed to bookmark post" });
    }
  }
);

export const removeFromBookmark = createAsyncThunk(
  "bookmark/removeFromBookmark",
  async ({ postId, token }, { rejectWithValue }) => {
    try {
      const { data, status } = await axios({
        method: "POST",
        url: `/api/users/remove-bookmark/${postId}`,
        headers: { authorization: token },
        data: {},
      });
      if (status === 200) {
        return {
          removeFromBookmark: data.bookmarks,
          message: "Removed from bookmark",
        };
      }
    } catch (e) {
      console.error(e);
      rejectWithValue({ message: "Failed to remove bookmark" });
    }
  }
);

export const getAllBookmarks = createAsyncThunk(
  "bookmark/getAllBookmarks",
  async ({ token }, { rejectWithValue }) => {
    try {
      const { data, status } = await axios({
        method: "GET",
        url: "/api/users/bookmark",
        headers: { authorization: token },
      });
      if (status === 200) {
        return { getAllBookmarks: data.bookmarks };
      }
    } catch (e) {
      console.error(e);
      return rejectWithValue(e);
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

    // Remove from bookmark
    [removeFromBookmark.pending]: (state) => {
      state.status = "pending";
    },
    [removeFromBookmark.fulfilled]: (state, { payload }) => {
      state.status = "fulfilled";
      state.bookmarks = payload.removeFromBookmark;
    },
    [removeFromBookmark.rejected]: (state) => {
      state.status = "rejected";
    },

    // Get all bookmarks
    [getAllBookmarks.pending]: (state) => {
      state.status = "pending";
    },
    [getAllBookmarks.fulfilled]: (state, { payload }) => {
      state.status = "fulfilled";
      state.bookmarks = payload.getAllBookmarks;
    },
    [getAllBookmarks.rejected]: (state) => {
      state.status = "rejected";
    },
  },
});

export default bookmartSlice.reducer;
