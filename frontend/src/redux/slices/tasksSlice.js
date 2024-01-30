import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  allTasks: [],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.allTasks = action.payload;
    },
    addOneTask: (state, action) => {
      state.allTasks = [...state.allTasks, action.payload];
    },
    setUpdatedTask: (state, action) => {
      state.allTasks = state.allTasks.map((task) =>
        task._id === action.payload._id ? { ...task, ...action.payload } : task
      );
    },
  },
});

export const { setTasks, addOneTask, setUpdatedTask } = tasksSlice.actions;
export default tasksSlice.reducer;
