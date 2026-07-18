import { createSlice } from "@reduxjs/toolkit";

const savedUser = JSON.parse(localStorage.getItem("admin"));

const initialState = {
  isAuthenticated: !!savedUser,
  user: savedUser,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;

      localStorage.setItem(
        "admin",
        JSON.stringify(action.payload)
      );
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;

      localStorage.removeItem("admin");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;