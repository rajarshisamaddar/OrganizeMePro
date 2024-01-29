import {createSlice} from '@reduxjs/toolkit';
const initialState = {
    taskToogle:false,
    allTasks:[],
}

export const tasksSlice = createSlice({
    name:"tasks",
    initialState,
    reducers:{
        toogleAdd:(state, action)=>{
            state.taskToogle=action.payload;
        },
        setAllTasks:(state, action)=>{
            state.allTasks=action.payload;
        }
    }
});

export const {toogleAdd} = tasksSlice.actions;
export default tasksSlice.reducer;