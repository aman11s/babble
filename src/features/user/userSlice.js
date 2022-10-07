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
        return { follow: user.following, message: "Successfully followed" };
      }
    } catch (e) {
      return rejectWithValue({ message: "Failed to follow" });
    }
  }
);

export const unfollowHandler = createAsyncThunk(
  "user/unfollowHandler",
  async ({ followUserId, token }, { rejectWithValue }) => {
    try {
      const { data, status } = await axios({
        method: "POST",
        url: `/api/users/unfollow/${followUserId}`,
        headers: { authorization: token },
        data: {},
      });
      if (status === 200) {
        const { user } = data;
        return { unfollow: user.following, message: "Successfully unfollowed" };
      }
    } catch (e) {
      return rejectWithValue({ message: "Failed to unfollow" });
    }
  }
);

export const getUser = createAsyncThunk(
  "user/getUser",
  async ({ username }, { rejectWithValue }) => {
    try {
      const { data, status } = await axios({
        method: "GET",
        url: `/api/users/${username}`,
      });
      if (status === 200) {
        return { getUser: data.user };
      }
    } catch (e) {
      return rejectWithValue(e);
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
      state.user.following = payload.follow;
    },

    // Unfollow Handler
    [unfollowHandler.pending]: (state) => {
      state.status = "pending";
    },
    [unfollowHandler.fulfilled]: (state, { payload }) => {
      state.status = "fulfilled";
      state.user.following = payload.unfollow;
    },
    [unfollowHandler.rejected]: (state) => {
      state.status = "rejected";
    },

    // Get User
    [getUser.pending]: (state) => {
      state.status = "pending";
    },
    [getUser.fulfilled]: (state) => {
      state.status = "fulfilled";
    },
    [getUser.rejected]: (state) => {
      state.status = "rejected";
    },
  },
});

export default userSlice.reducer;
