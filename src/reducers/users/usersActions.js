//userActions

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { selectCurrentUser } from "./usersSlice.js";

export const addUserAsync = createAsyncThunk(
  "users/addUserAsync",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:6001/api/users/register",
        userData,
      );

      if (response?.data) {
        return response.data;
      } else {
        console.error("Invalid response:", response);
        return rejectWithValue("Invalid response");
      }
    } catch (error) {
      console.error("API error:", error?.response?.data);
      return rejectWithValue(error?.response?.data || "API error");
    }
  },
);
export const loginUserAsync = createAsyncThunk(
  "users/loginUserAsync",
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:6001/api/auth/login",
        credentials,
      );

      if (response?.data) {
        console.log(response.data);
        return response.data.user; // Return the user data directly
      } else {
        console.error("Invalid response:", response);
        return rejectWithValue("Invalid response");
      }
    } catch (error) {
      console.error("API error:", error?.response?.data);
      return rejectWithValue(error?.response?.data || "API error");
    }
  },
);
export const fetchUserInfo = createAsyncThunk(
  "users/fetchUserInfo",
  async (_, { getState, rejectWithValue }) => {
    try {
      const userId = getState().user.id; // Assuming you store user ID in the Redux state

      // Make sure to replace `'/api/users/'` with your actual API endpoint
      const response = await axios.get(
        `http://localhost:6001/api/users/${userId}`,
      );

      // Handle the response data as needed
      return response.data;
    } catch (error) {
      console.error("Error fetching user information:", error);
      throw error;
    }
  },
);

export const logoutUser = () => {
  return { type: "users/logoutUser" };
};
