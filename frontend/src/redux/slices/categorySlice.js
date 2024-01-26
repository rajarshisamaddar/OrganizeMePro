import {createSlice} from '@reduxjs/toolkit'
import { categoryData } from '@/data/categoryData'
const initialState = {
    activeCategory:categoryData[0].title,
}

export const categorySlice = createSlice({
    name:"category",
    initialState,
    reducers:{
        setActiveCategory:(state, action)=>{
            state.activeCategory=action.payload
        }
    }
});

export const{setActiveCategory} = categorySlice.actions;
export default categorySlice.reducer;