import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: true,
  authReady: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.user = payload;
    },
    logout: (state) => {
      state.payload = null;
    },
    isAuthReady: (state) => {
      state.authReady = true;
    },
  },
});

export const { isAuthReady, login, logout } = userSlice.actions;
export default userSlice.reducer;
