import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const followHandler = createAsyncThunk(
  "user/followHandler",
  async ({ followUserId, token }, { rejectWithValue }) => {
    try {
      const res = await axios({
        method: "POST",
        url: `/api/users/follow/${followUserId}`,
        headers: { authorization: token },
        data: {},
      });
      console.log(res);
    } catch (e) {
      console.error(e);
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
});

export default userSlice.reducer;
