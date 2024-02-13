// tasksSlice.js

import {createSlice} from "@reduxjs/toolkit";
import {addTaskAsync, fetchUserTasks} from "./tasksActions.js";

const tasksSlice = createSlice({
    name: "tasks",
    initialState: {
        list: [],
        status: "idle",
        error: null,
    },
    reducers: {
        addTask: (state, action) => {
            state.list.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            // addTask
            // addTaskAsync
            .addCase(addTaskAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addTaskAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.list.push(action.payload);
            })
            .addCase(addTaskAsync.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            // fetchUserTasks
            .addCase(fetchUserTasks.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchUserTasks.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.list = action.payload;
            })
            .addCase(fetchUserTasks.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export const {addTask} = tasksSlice.actions;
export default tasksSlice.reducer;


/*import { createSlice } from "@reduxjs/toolkit";
import { addTaskAsync } from "./tasksActions.js";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addTask: (state, action) => {
      state.list.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTaskAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTaskAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list.push(action.payload);
      })
      .addCase(addTaskAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addTask } = tasksSlice.actions;
export default tasksSlice.reducer;*/


/*import { createSlice } from "@reduxjs/toolkit";
import { addTaskAsync } from "./tasksActions.js";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addTask: (state, action) => {
      state.list.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTaskAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTaskAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list.push(action.payload);
      })
      .addCase(addTaskAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addTask } = tasksSlice.actions;
export default tasksSlice.reducer;
*/