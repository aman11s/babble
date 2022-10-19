import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  addComment,
  deleteComment,
  editComment,
} from "../comment/commentSlice";

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

export const likeUnlikePost = createAsyncThunk(
  "post/likeUnlikePost",
  async ({ postId, token, action }, { rejectWithValue }) => {
    try {
      const { data, status } = await axios({
        method: "POST",
        url: `/api/posts/${action}/${postId}`,
        headers: { authorization: token },
        data: {},
      });
      if (status === 201) {
        return { likeUnlikePost: data.posts };
      }
    } catch (e) {
      console.error(e);
      rejectWithValue({ message: `Failed to ${action} post` });
    }
  }
);

export const getUserPost = createAsyncThunk(
  "post/getUserPost",
  async ({ username }, { rejectWithValue }) => {
    try {
      const { data, status } = await axios({
        method: "GET",
        url: `/api/posts/user/${username}`,
      });
      if (status === 200) {
        return { getUserPost: data.posts };
      }
    } catch (e) {
      console.error(e);
    }
  }
);

export const getSinglePost = createAsyncThunk(
  "post/getSinglePost",
  async ({ postId }, { rejectWithValue }) => {
    try {
      const { data, status } = await axios({
        method: "GET",
        url: `/api/posts/${postId}`,
      });
      if (status === 200) {
        return { getSinglePost: data.post };
      }
    } catch (e) {
      return rejectWithValue(e);
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
    [createPost.fulfilled]: (state, { payload }) => {
      state.posts = payload.createPost;
    },

    // Edit Post
    [editPost.fulfilled]: (state, { payload }) => {
      state.posts = payload.editPost;
    },

    // Delete Post
    [deletePost.fulfilled]: (state, { payload }) => {
      state.posts = payload.deletePost;
    },

    // Like & Unlike Post
    [likeUnlikePost.fulfilled]: (state, { payload }) => {
      state.posts = payload.likeUnlikePost;
    },

    // Consume add new comments
    [addComment.fulfilled]: (state, { payload }) => {
      const foundPost = state.posts.find(({ _id }) => _id === payload.postId);
      foundPost.comments = payload.addComment;
    },

    // Consume delete comments
    [deleteComment.fulfilled]: (state, { payload }) => {
      const foundPost = state.posts.find(({ _id }) => _id === payload.postId);
      foundPost.comments = payload.deleteComment;
    },

    // Consume edit comments
    [editComment.fulfilled]: (state, { payload }) => {
      const foundPost = state.posts.find(({ _id }) => _id === payload.postId);
      foundPost.comments = payload.editComment;
    },

    // Get User post
    [getUserPost.pending]: (state) => {
      state.status = "pending";
    },
    [getUserPost.fulfilled]: (state) => {
      state.status = "fulfilled";
    },
    [getUserPost.rejected]: (state) => {
      state.status = "rejected";
    },

    // Get single post
    [getSinglePost.pending]: (state) => {
      state.status = "pending";
    },
    [getSinglePost.fulfilled]: (state) => {
      state.status = "fulfilled";
    },
    [getSinglePost.rejected]: (state) => {
      state.status = "rejected";
    },
  },
});

export default postSlice.reducer;
export const { sortByHandler } = postSlice.actions;
