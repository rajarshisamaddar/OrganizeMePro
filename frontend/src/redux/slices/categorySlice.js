import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  add: false,
  categories: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setAdd: (state, action) => {
      state.add = action.payload;
    },

    setCategory:(state, action)=>{
        state.categories=action.payload;
    },
    addCategory: (state, action) => {
        state.categories=[...state.categories, action.payload]
    },
  },
});

export const { addCategory, setAdd, setCategory } = categorySlice.actions;
export default categorySlice.reducer;
