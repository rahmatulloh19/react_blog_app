import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  me: JSON.parse(localStorage.getItem("me")) || {},
};

export const meSlice = createSlice({
  name: "me",
  initialState,
  reducers: {
    setMe: (state, action) => {
      state.me = action.payload;
    },
    removeMe: (state) => {
      state.me = {};
    },
  },
});

export default meSlice.reducer;
