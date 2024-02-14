// tasksSlice.js

import {createSlice} from "@reduxjs/toolkit";
import {addTaskAsync, deleteTaskAsync, fetchUserTasks, updateTaskAsync} from "./tasksActions.js";

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
        deleteTask: (state, action) => {
            const taskIdToDelete = action.payload;
            const updatedTasks = state.tasks.filter((task) => task.id !== taskIdToDelete);
            return {
                ...state,
                tasks: updatedTasks,
            };
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
            })
            .addCase(deleteTaskAsync.fulfilled, (state, action) => {
                const taskIdToDelete = action.payload;
                state.tasks = state.tasks.filter((task) => task.id !== taskIdToDelete);
            })
            /*.addCase(updateTaskAsync.fulfilled, (state, action) => {
                const updatedTask = action.payload;
                state.list = state.list.map((task) => (task.id === updatedTask.id ? updatedTask : task)); // Corrected from 'tasks' to 'list'
            })*/

            /*.addCase(updateTaskAsync.fulfilled, (state, action) => {
                const updatedTask = action.payload;
                // Assuming tasks is an array of tasks
                state.list = state.list.map((task) => (task.id === updatedTask.id ? updatedTask : task));
            })*/
            .addCase(updateTaskAsync.fulfilled, (state, action) => {
                const updatedTask = action.payload;
                state.list = state.list.map((task) => (task.id === updatedTask.id ? updatedTask : task));
            });
    },
});

export const {addTask, deleteTask} = tasksSlice.actions;
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