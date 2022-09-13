import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllPosts = createAsyncThunk(
  "post/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data, status } = await axios({
        method: "GET",
        url: "/api/posts",
      });
      if (status === 200) {
        return { posts: data.posts };
      }
    } catch (e) {
      console.error(e);
      return rejectWithValue(e);
    }
  }
);

export const createPost = createAsyncThunk(
  "post/createPost",
  async ({ token, postData }, { rejectWithValue }) => {
    try {
      const { data, status } = await axios({
        method: "POST",
        url: "/api/posts",
        headers: { authorization: token },
        data: { postData },
      });
      if (status === 201) {
        return { posts: data.posts, message: "Posted Successfully" };
      }
    } catch (e) {
      console.error(e);
      return rejectWithValue({ message: "Failed to post" });
    }
  }
);

export const editPost = createAsyncThunk(
  "post/editPost",
  async ({ token, postId, postData }, { rejectWithValue }) => {
    try {
      const { data, status } = await axios({
        method: "POST",
        url: `/api/posts/edit/${postId}`,
        headers: { authorization: token },
        data: { postData },
      });
      if (status === 201) {
        return { posts: data.posts, message: "Post edited successfully" };
      }
    } catch (e) {
      console.error(e);
      return rejectWithValue({ message: "Failed to edit post" });
    }
  }
);

const initialState = {
  posts: [],
  status: "idle",
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: {
    // All posts
    [getAllPosts.pending]: (state) => {
      state.status = "pending";
    },
    [getAllPosts.fulfilled]: (state, { payload }) => {
      state.status = "fulfilled";
      state.posts = payload.posts;
    },
    [getAllPosts.rejected]: (state) => {
      state.status = "rejected";
    },

    // Create Post
    [createPost.pending]: (state) => {
      state.status = "pending";
    },
    [createPost.fulfilled]: (state, { payload }) => {
      state.status = "fulfilled";
      state.posts = payload.posts;
    },
    [createPost.rejected]: (state) => {
      state.status = "rejected";
    },

    // Edit Post
    [editPost.pending]: (state) => {
      state.status = "pending";
    },
    [editPost.fulfilled]: (state, { payload }) => {
      state.status = "fulfilled";
      state.posts = payload.posts;
    },
    [editPost.rejected]: (state) => {
      state.status = "rejected";
    },
  },
});

export default postSlice.reducer;
