import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:{}
}

export const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        username:(state,action)=>{
            state.user.name=action.payload
            
        },
        email:(state,action)=>{
            state.user.email=action.payload
        },
        imageURL:(state,action)=>{
            state.user.imageURL=action.payload
        }
    }
})

export const {username,email,imageURL}=userSlice.actions
export default userSlice.reducer