import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: JSON.parse(localStorage.getItem("theme")) || null,
  user: JSON.parse(localStorage.getItem("userData")) || null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toogleTheme: (state, action) => {
      localStorage.setItem("theme", JSON.stringify(action.payload));
      state.theme = action.payload;
    },
    setUser: (state, action) => {
      localStorage.setItem("userData", JSON.stringify(action.payload));
      state.user = action.payload;
    },
    logoutUser: (state, action) => {
      localStorage.removeItem("userData");
      localStorage.removeItem("theme");
      (state.user = null), (state.theme = null);
    },
  },
});

export const { toogleTheme, setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
