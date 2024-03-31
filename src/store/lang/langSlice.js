import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lang: localStorage.getItem("lang") || "en",
};

export const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    setLang: (state, action) => {
      state.lang = action.payload;
    },
    removeLang: (state) => {
      state.lang = "";
    },
  },
});

export default langSlice.reducer;
