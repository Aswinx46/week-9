import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:{}
}

export const signupSlice=createSlice({
    name:'signup',
    initialState,
    reducers:{
        addUser:(state,action)=>{
            const user={
          name:action.payload.name,
          email:action.payload.email,
          password:action.payload.password,
        //   imageUrl:action.payload.imageUrl      

            }
            state.user=user
        }
    }
})

export const {addUser} = signupSlice.actions
export default signupSlice.reducer