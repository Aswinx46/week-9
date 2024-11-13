import { createSlice } from "@reduxjs/toolkit";

const initialState={
    admin:{}
}

export const adminSlice=createSlice({
    name:'admin',
    initialState,
    reducers:{
        adminName:(state,action)=>{
            state.admin.name=action.payload
        },
        adminPassword:(state,action)=>{
            state.admin.password=action.payload
        }
       
    }
})

export const {adminName,adminPassword}=adminSlice.actions
export default adminSlice.reducer