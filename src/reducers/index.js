// src/reducers/index.js
import { combineReducers } from "@reduxjs/toolkit";
import usersReducer from "./users/usersSlice.js";
import tasksReducer from "./tasks/tasksSlice.js";

const rootReducer = combineReducers({
  users: usersReducer,
  tasks: tasksReducer,
});

export default rootReducer;
