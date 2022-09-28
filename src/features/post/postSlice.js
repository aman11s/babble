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
        return { createPost: data.posts, message: "Posted Successfully" };
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
        return {
          editPost: data.posts,
          message: "Post edited successfully",
          editPostId: postId,
        };
      }
    } catch (e) {
      console.error(e);
      return rejectWithValue({ message: "Failed to edit post" });
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async ({ postId, token }, { rejectWithValue }) => {
    try {
      const { data, status } = await axios({
        method: "DELETE",
        url: `/api/posts/${postId}`,
        headers: { authorization: token },
      });
      if (status === 201) {
        return { deletePost: data.posts, message: "Post deleted successfully" };
      }
    } catch (e) {
      console.error(e);
      return rejectWithValue({ message: "Failed to delete post" });
    }
  }
);

const initialState = {
  posts: [],
  status: "idle",
  sortBy: "Latest",
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    sortByHandler: (state, { payload }) => {
      state.sortBy = payload;
    },
  },
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
      state.posts = payload.createPost;
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
      state.posts = payload.editPost;
    },
    [editPost.rejected]: (state) => {
      state.status = "rejected";
    },

    // Delete Post
    [deletePost.pending]: (state) => {
      state.status = "pending";
    },
    [deletePost.fulfilled]: (state, { payload }) => {
      state.status = "fulfilled";
      state.posts = payload.deletePost;
    },
    [deletePost.rejected]: (state) => {
      state.status = "rejected";
    },
  },
});

export default postSlice.reducer;
export const { sortByHandler } = postSlice.actions;
