import { createSlice } from "@reduxjs/toolkit";
import {
  addUserAsync,
  loginUserAsync,
  fetchUsersAsync,
} from "./usersActions.js";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    currentUser: null,
    isAuthenticated: false,
    user: {
      // other properties
      id: null,
    },
  },
  reducers: {
    addUser: (state, action) => {
      state.list.push(action.payload);
    },
    loginUser: (state, action) => {
      state.isAuthenticated = true;
      state.currentUser = action.payload;
    },
    logoutUser: (state) => {
      localStorage.clear();
      state.isAuthenticated = false;
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUserAsync.fulfilled, (state, action) => {
        state.list = [...state.list, action.payload];
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.currentUser = action.payload;
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchUsersAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addUser, loginUser, logoutUser } = usersSlice.actions;

// Corrected selector function
export const selectCurrentUser = (state) => state.users.currentUser;

export default usersSlice.reducer;
