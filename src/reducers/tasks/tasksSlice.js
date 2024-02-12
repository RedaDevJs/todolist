// src/reducers/tasksSlice.js
import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    list: [],
  },
  reducers: {
    addTask: (state, action) => {
      state.list.push(action.payload);
    },
    // Ajoutez d'autres actions pour la gestion des tâches si nécessaire
  },
});

export const { addTask } = tasksSlice.actions;
export default tasksSlice.reducer;
