import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./slices/navSlice";
import React from "react";

export const store = configureStore({
  reducer: {
    nav: navReducer,
  },
});
