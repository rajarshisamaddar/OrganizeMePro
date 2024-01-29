import { configureStore } from "@reduxjs/toolkit";
import  authSlice  from "./slices/AuthSlice";
import categorySlice from "./slices/categorySlice";
import tasksSlice from "./slices/tasksSlice";

const store = configureStore({
    reducer:{
        auth:authSlice,
        category:categorySlice,
        tasks:tasksSlice,
    }
})

export default store;