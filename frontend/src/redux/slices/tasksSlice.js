import {createSlice} from '@reduxjs/toolkit';
const initialState = {
    allTasks:[],
}

export const tasksSlice = createSlice({
    name:"tasks",
    initialState,
    reducers:{
        setTasks:(state, action)=>{
            state.allTasks=action.payload;
        },
        addOneTask:(state, action)=>{
            state.allTasks=[...state.allTasks, action.payload]
        },
    }
});

export const {setTasks, addOneTask} = tasksSlice.actions;
export default tasksSlice.reducer;