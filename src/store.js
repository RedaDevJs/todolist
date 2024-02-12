//store.js

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/index.js";
//import { thunk } from "redux-thunk";

export const store = configureStore({
  reducer: {
    reducer: rootReducer,
  },
  //middleware: [thunk],
});
