import { createSlice } from "@reduxjs/toolkit";
import { addUserAsync, loginUserAsync } from "./usersActions.js";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    currentUser: null,
    isAuthenticated: false,
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
      });
  },
});

export const { addUser, loginUser, logoutUser } = usersSlice.actions;

// Corrected selector function
export const selectCurrentUser = (state) => state.users.currentUser;

export default usersSlice.reducer;
