import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addComment = createAsyncThunk(
  "comment/addComment",
  async ({ postId, token, commentData }, { rejectWithValue }) => {
    try {
      const { data, status } = await axios({
        method: "POST",
        url: `/api/comments/add/${postId}`,
        headers: { authorization: token },
        data: { commentData },
      });
      if (status === 201) {
        return {
          addComment: data.comments,
          postId,
          message: "Comment successfully added",
        };
      }
    } catch (e) {
      console.error(e);
      rejectWithValue({ message: "Failed to comment" });
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async ({ postId, commentId, token }, { rejectWithValue }) => {
    try {
      const { data, status } = await axios({
        method: "DELETE",
        url: `/api/comments/delete/${postId}/${commentId}`,
        headers: { authorization: token },
      });
      if (status === 201) {
        return {
          deleteComment: data.comments,
          postId,
          message: "Comment deleted",
        };
      }
    } catch (e) {
      console.error(e);
      return rejectWithValue({ message: "Failed to delete comment" });
    }
  }
);

const initialState = {
  comments: [],
  status: "idle",
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: {
    // Add post comment
    [addComment.pending]: (state) => {
      state.status = "pending";
    },
    [addComment.fulfilled]: (state, { payload }) => {
      state.comments = payload.addComment;
    },
    [addComment.rejected]: (state) => {
      state.status = "rejected";
    },

    // Delete comment
    [deleteComment.pending]: (state) => {
      state.status = "pending";
    },
    [deleteComment.fulfilled]: (state, { payload }) => {
      state.status = "fulfilled";
      state.comments = payload.deleteComment;
    },
    [deleteComment.rejected]: (state) => {
      state.status = "rejected";
    },
  },
});

export default commentSlice.reducer;
