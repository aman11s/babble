import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const loginHandler = createAsyncThunk(
  "auth/loginHandler",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const { data, status } = await axios({
        method: "POST",
        url: "/api/auth/login",
        data: { username, password },
      });
      if (status === 200) {
        const {
          encodedToken,
          foundUser: { username, firstName, lastName },
        } = data;
        return {
          userData: {
            token: encodedToken,
            user: { username, firstName, lastName },
          },
        };
      }
    } catch (e) {
      const { status } = e.response;
      if (status === 404) {
        toast.error("User not found, Create new account");
      } else if (status === 401) {
        toast.error("Wrong Credentials, Please try again!");
      }
      return rejectWithValue(e);
    }
  }
);

export const signupHandler = createAsyncThunk(
  "auth/signupHandler",
  async (formData, { rejectWithValue }) => {
    try {
      const { data, status } = await axios({
        method: "POST",
        url: "/api/auth/signup",
        data: { ...formData },
      });
      if (status === 201) {
        const {
          encodedToken,
          createdUser: { username, firstName, lastName },
        } = data;
        return {
          userData: {
            token: encodedToken,
            user: { username, firstName, lastName },
          },
        };
      }
    } catch (e) {
      const { status } = e.response;
      if (status === 422) {
        toast.error("Account Already Exists");
      }
      return rejectWithValue(e);
    }
  }
);

const initialState = {
  userData: JSON.parse(localStorage.getItem("userData")) || {},
  status: "idle",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    // Login Handler
    [loginHandler.pending]: (state) => {
      state.status = "pending";
    },
    [loginHandler.fulfilled]: (state, { payload }) => {
      state.userData = payload.userData;
      localStorage.setItem("userData", JSON.stringify(payload.userData));
      toast.success("Successfully logged in");
    },
    [loginHandler.rejected]: (state) => {
      state.status = "rejected";
    },

    // Signup Handler
    [signupHandler.pending]: (state) => {
      state.status = "pending";
    },
    [signupHandler.fulfilled]: (state, { payload }) => {
      state.userData = payload.userData;
      localStorage.setItem("userData", JSON.stringify(payload.userData));
      toast.success("Successfully signed up");
    },
    [signupHandler.rejected]: (state) => {
      state.status = "rejected";
    },
  },
});

export default authSlice.reducer;
