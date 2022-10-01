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
          message: "Comment successfully added",
        };
      }
    } catch (e) {
      console.error(e);
      rejectWithValue({ message: "Failed to comment" });
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
    [addComment.pending]: (state) => {
      state.status = "pending";
    },
    [addComment.fulfilled]: (state, { payload }) => {
      state.comments = payload.addComment;
    },
    [addComment.rejected]: (state) => {
      state.status = "rejected";
    },
  },
});

export default commentSlice.reducer;
