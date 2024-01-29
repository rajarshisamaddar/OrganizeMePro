import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: true,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    toogleTheme: (state, action) => {
      state.user.style.theme = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },

    logoutUser: (state, action) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      state.user = null;
    },
  },
});

export const {
  toogleTheme,
  setUser,
  logoutUser,
  setLoading,
  updateUser,
} = authSlice.actions;
export default authSlice.reducer;
