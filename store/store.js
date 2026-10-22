"use client";
import { configureStore } from "@reduxjs/toolkit";
import { reducers } from "./slices";
export const makeStore = () =>
  configureStore({
    reducer: reducers,
  });
