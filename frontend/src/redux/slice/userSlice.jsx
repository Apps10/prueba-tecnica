import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";
import Cookies from 'js-cookie';

const initialState = {
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,
};

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get('token')

      if(!token ) return rejectWithValue(null)
      const res = await axiosInstance.post("/auth/check", {},{
        headers: {
          Authorization: 'Bearer '+ token
        }
      });
      return res.data.user;
    } catch (error) {
      console.error(error);
      return rejectWithValue(null);
    }
  }
);

export const signin = createAsyncThunk(
  "auth/signin",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/signin", data);
      Cookies.set('token', res.data.token, { expires: 7 })
      toast.success("Register Successfully!!!");
      return res.data.user;
    } catch (err) {
      const { message } = err.response.data;
      console.log(message);
      toast.error(message);
      return rejectWithValue(null);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      toast.success("Logged out successfully");
      Cookies.remove('token')
      return null;
    } catch (err) {
      const { error } = err.response.data;
      toast.error(error);
      return rejectWithValue(null);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/login", data);
      Cookies.set('token', res.data.token, { expires: 7 })
      toast.success(`Welcome Back ${res.data.user.fullName}!!!`);
      return res.data.user
    } catch (err) {
      const { message } = err.response.data;
      toast.error(message);
      return rejectWithValue(null);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.isCheckingAuth = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.authUser = action.payload
        state.isCheckingAuth = false;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authUser = null;
        state.isCheckingAuth = false;
      })
      .addCase(signin.pending, (state) => {
        state.isSigningUp = true;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isSigningUp = false;
      })
      .addCase(signin.rejected, (state) => {
        state.authUser = null;
        state.isSigningUp = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.authUser = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoggingIn = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isLoggingIn = false;
      })
      .addCase(login.rejected, (state) => {
        state.authUser = null;
        state.isLoggingIn = false;
      });
  },
});

export default authSlice.reducer;
