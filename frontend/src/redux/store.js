import { configureStore } from "@reduxjs/toolkit";
import  authSlice  from "./slices/AuthSlice";
import categorySlice from "./slices/categorySlice";

const store = configureStore({
    reducer:{
        auth:authSlice,
        category:categorySlice,
    }
})

export default store;