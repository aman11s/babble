import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { editPost } from "../post/postSlice";

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

    // Consume edited post
    [editPost.fulfilled]: (state, { payload }) => {
      const { editPost, editPostId } = payload;
      const getEditedPost = editPost.find(({ _id }) => _id === editPostId);
      const getEditedPostIndexInBookmark = state.bookmarks.findIndex(
        ({ _id }) => _id === getEditedPost._id
      );
      state.bookmarks[getEditedPostIndexInBookmark] = getEditedPost;
    },
  },
});

export default bookmartSlice.reducer;
