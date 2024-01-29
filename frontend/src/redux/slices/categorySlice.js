import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  toogleCategory: false,
  categories: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setAdd: (state, action) => {
      state.toogleCategory = action.payload;
    },

    setCategory: (state, action) => {
      state.categories = action.payload;
    },
    updateCategorySlice: (state, action) => {
      const upadteCategory = state.categories.map((item) =>
        item._id === action.payload._id ? {...item, ...action.payload} : item
      );

      state.categories=upadteCategory;
    },
    addCategory: (state, action) => {
      state.categories = [...state.categories, action.payload];
    },
  },
});

export const { addCategory, setAdd, setCategory, updateCategorySlice } =
  categorySlice.actions;
export default categorySlice.reducer;
