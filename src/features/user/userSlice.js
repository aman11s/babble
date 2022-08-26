import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginHandler } from "../auth/authSlice";

export const followHandler = createAsyncThunk(
  "user/followHandler",
  async ({ followUserId, token }, { rejectWithValue }) => {
    try {
      const { data, status } = await axios({
        method: "POST",
        url: `/api/users/follow/${followUserId}`,
        headers: { authorization: token },
        data: {},
      });
      if (status === 200) {
        const { user } = data;
        return { following: user.following, message: "Successfully followed" };
      }
    } catch (e) {
      return rejectWithValue({ message: "Failed to follow" });
    }
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem("userData"))?.user || {},
  status: "idle",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    // Consume user from auth actions
    [loginHandler.fulfilled]: (state, { payload }) => {
      state.user = payload.userData.user;
    },

    // Follow Handler
    [followHandler.pending]: (state) => {
      state.status = "pending";
    },
    [followHandler.fulfilled]: (state, { payload }) => {
      state.status = "fulfilled";
      state.user.following = payload.following;
    },
  },
});

export default userSlice.reducer;
