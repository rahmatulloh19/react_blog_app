import { configureStore } from "@reduxjs/toolkit";
import meSlice from "./me/meSlice";
import langSlice from "./lang/langSlice";
import tokenSlice from "./token/tokenSlice";

export const store = configureStore({
  reducer: {
    me: meSlice,
    lang: langSlice,
    token: tokenSlice,
  },
});
