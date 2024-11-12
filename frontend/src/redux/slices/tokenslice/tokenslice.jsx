import { createSlice } from "@reduxjs/toolkit";

const initialState={
    token:''
}

export const tokenSplice=createSlice({
    name:'token',
    initialState,
    reducers:{
        addToken:(state,action)=>{
            state.token=action.payload
        }
    }
})

export const {addToken}=tokenSplice.actions;
export default tokenSplice.reducer