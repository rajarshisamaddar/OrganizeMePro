import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: JSON.parse(localStorage.getItem("theme")) || null,
  user:{},
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
