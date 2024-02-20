//userActions.js

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { selectCurrentUser } from "./usersSlice.js";

const API_BASE_URL = "http://localhost:6001";
export const fetchUsersAsync = createAsyncThunk(
  "users/fetchUsersAsync",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users`);
      console.log("Fetched users:", response.data); // Log the fetched data
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      return rejectWithValue(error?.response?.data || "API error");
    }
  },
);

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
        localStorage.setItem("token", response.data.token);
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

export const updateUserBlockedStatusAsync = createAsyncThunk(
  "users/updateUserBlockedStatusAsync",
  async ({ userId, isBlocked }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/users/${userId}`, {
        isBlocked,
      });
      dispatch(fetchUsersAsync());
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
