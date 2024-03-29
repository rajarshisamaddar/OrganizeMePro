import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  toogleCategory: false,
  categories: [],
  collaborators: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCollaborators: (state, action) => {
      state.collaborators = action.payload;
    },
    setAdd: (state, action) => {
      state.toogleCategory = action.payload;
    },

    setCategory: (state, action) => {
      state.categories = action.payload;
    },
    updateCategorySlice: (state, action) => {
      const upadteCategory = state.categories.map((item) =>
        item._id === action.payload._id ? { ...item, ...action.payload } : item
      );

      state.categories = upadteCategory;
    },
    addCategory: (state, action) => {
      state.categories = [...state.categories, action.payload];
    },
  },
});

export const {
  addCategory,
  setCollaborators,
  setAdd,
  setCategory,
  updateCategorySlice,
} = categorySlice.actions;
export default categorySlice.reducer;
